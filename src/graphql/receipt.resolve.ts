import { ApolloError } from 'apollo-server-errors';
import mongoose from 'mongoose';

import {
  CreateArgs,
  DataStoreError,
  DeleteArgs,
  ForbiddenError,
  GraphQLRequestContextWithAuth,
  QueryArgs,
  UpdateArgs,
} from '../common/types';
import { CreateReceipt, IdCode, Receipt, Receipts, UpdateReceipt, WhereOptionsReceipt } from '../generated/graphql';
import { ReceiptModel } from '../models/receipt';
import { ReceiptBookModel } from '../models/receipt_book';
import { formatDataStoreError } from '../utils/formatDataStoreError';
import { parseWhereArgsToMongoQuery } from '../utils/graphql/parseMongoQuery';
import { withPageInfo } from '../utils/graphql/withPageInfo';
import { sanitize } from '../utils/stringUtils';
import { uuidFromString } from '../utils/uuid';

// FIXME: Sorting is not yet possible, need to implement for mongoose based resolver
export const resolvers = {
  Query: {
    async ReceiptsAll(): Promise<Receipt[]> {
      return await ReceiptModel.find({}).populate('receiptBook');
    },
    async Receipts(parent: never, args: QueryArgs<Receipt, WhereOptionsReceipt>): Promise<Receipts> {
      const query = { ...args.where };
      const parsedQuery = parseWhereArgsToMongoQuery(query);

      const response = await ReceiptModel.find(parsedQuery).populate('receiptBook');
      const countResponse = await ReceiptModel.countDocuments(parsedQuery);

      return withPageInfo(args, response, countResponse);
    },
    async Receipt(parent: never, args: QueryArgs<Receipt, WhereOptionsReceipt>): Promise<Receipt> {
      if (!args.where || Object.keys(args.where).length === 0) {
        throw new ApolloError('A "where" condition is required.', 'WHERE_CONDITION_REQUIRED');
      }

      const query = { ...args.where };

      return (await ReceiptModel.findOne(parseWhereArgsToMongoQuery(query))).populate('receiptBook');
    },
  },
  Mutation: {
    async createReceipt(parent: never, args: CreateArgs<CreateReceipt>, context: GraphQLRequestContextWithAuth): Promise<Receipt> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!args.item || Object.keys(args.item).length === 0) {
        throw new ApolloError('An "item" CreateReceipt object is required.', 'CREATE_ARGS_REQUIRED');
      }

      const idCode = args.item.aadharNumber ? IdCode.Aadhar : args.item.panNumber ? IdCode.Pan : null;
      const sanitizedName = sanitize(args.item.name + new Date().toString());
      const uuid = uuidFromString(ReceiptModel.name, sanitizedName);
      const { item } = args;

      try {
        const receiptBook = await ReceiptBookModel.findById(args.item.receiptBookId);
        if (!receiptBook) {
          throw new ApolloError('ReceiptBook not found', 'RECEIPTBOOK_NOT_FOUND');
        }

        if (receiptBook.usedReceipts >= receiptBook.totalReceipts) {
          throw new ApolloError('ReceiptBook is full', 'RECEIPTBOOK_FULL');
        }

        // Seems prone to error, 14 + 1 = 15 full, delete 1 = 14, 14 + 1 = 15 dupplicate
        // const nextReceiptNumber = receiptBook.receiptSeries + receiptBook.usedReceipts;

        const lastReceipt = await ReceiptModel.findOne({ receiptBook: args.item.receiptBookId }).sort({ receiptNumber: -1 });
        const nextReceiptNumber = lastReceipt ? lastReceipt.receiptNumber + 1 : receiptBook.receiptSeries;

        const newReceipt = new ReceiptModel({
          ...item,
          uuid,
          idCode,
          receiptNumber: nextReceiptNumber,
          receiptBook: receiptBook.id,
        });

        await newReceipt.save();

        receiptBook.usedReceipts += 1;
        await receiptBook.save();

        return newReceipt.populate('receiptBook');
      } catch (error) {
        console.error(`Receipt.create uuid=[${uuid}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error creating Receipt'));
      }
    },
    async updateReceipt(parent: never, args: UpdateArgs<UpdateReceipt>, context: GraphQLRequestContextWithAuth): Promise<Receipt> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!args.item || Object.keys(args.item).length === 0) {
        throw new ApolloError('An "item" UpdateReceipt object is required.', 'UPDATE_ARGS_REQUIRED');
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const { item, id } = args;
        const receiptToUpdate = await ReceiptModel.findById(id).session(session);

        if (!receiptToUpdate) {
          throw new ApolloError('Receipt not found', 'NOT_FOUND');
        }

        // Check if receiptBookId is changing
        if (item.receiptBookId && item.receiptBookId !== String(receiptToUpdate.receiptBook)) {
          // Decrement usedReceipts count in old ReceiptBook
          const oldReceiptBook = await ReceiptBookModel.findById(receiptToUpdate.receiptBook).session(session);
          if (oldReceiptBook) {
            oldReceiptBook.usedReceipts = Math.max(0, oldReceiptBook.usedReceipts - 1);
            await oldReceiptBook.save({ session });
          }

          // Increment usedReceipts count in new ReceiptBook
          const newReceiptBook = await ReceiptBookModel.findById(item.receiptBookId).session(session);
          if (!newReceiptBook) {
            throw new ApolloError('New ReceiptBook not found', 'RECEIPTBOOK_NOT_FOUND');
          }
          if (newReceiptBook.usedReceipts >= newReceiptBook.totalReceipts) {
            throw new ApolloError('New ReceiptBook is full', 'RECEIPTBOOK_FULL');
          }
          newReceiptBook.usedReceipts += 1;
          await newReceiptBook.save({ session });
        }

        const updatedReceipt = await ReceiptModel.findByIdAndUpdate(id, item, { new: true, session: session }).populate('receiptBook');

        await session.commitTransaction();
        return updatedReceipt;
      } catch (error) {
        await session.abortTransaction();
        console.error(`Receipt.update [${args.id}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error updating Receipt'));
      } finally {
        session.endSession();
      }
    },
    async deleteReceipt(parent: never, args: DeleteArgs<{ id: string }>, context: GraphQLRequestContextWithAuth): Promise<Receipt> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!args.id) {
        throw new ApolloError('An "id" is required to delete.', 'DELETE_ARGS_REQUIRED');
      }

      try {
        const { id } = args;
        const deletedReceipt = await ReceiptModel.findByIdAndDelete(id);

        if (!deletedReceipt) {
          throw new ApolloError('Receipt not found', 'NOT_FOUND');
        }

        // Update the usedReceipts counter in the corresponding ReceiptBook
        const receiptBook = await ReceiptBookModel.findById(deletedReceipt.receiptBook);
        if (receiptBook) {
          receiptBook.usedReceipts -= 1;
          await receiptBook.save();
        }

        return deletedReceipt.populate('receiptBook');
      } catch (error) {
        console.error(`Receipt.delete [${args.id}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error deleting Receipt'));
      }
    },
  },
};
