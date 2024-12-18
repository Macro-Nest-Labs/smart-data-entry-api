import { model, Schema } from 'mongoose';

import { ReceiptBook } from '../generated/graphql';

const financialYearPattern = /^[0-9]{4}-[0-9]{4}$/;

const ReceiptBookSchema = new Schema<ReceiptBook>({
  uuid: { type: String, required: true, unique: true },
  receiptBookNumber: { type: Number, required: true, unique: true },
  receiptSeries: {
    type: Number,
    required: [true, 'Receipt Series is required'],
    min: [1, 'Receipt Series should be at least 1'],
  },
  totalReceipts: {
    type: Number,
    required: false,
    min: [1, 'Total Receipt(s) should be at least 1'],
  },
  financialYear: {
    type: String,
    required: false,
    match: [financialYearPattern, 'Please enter a valid financial year (2023-2024)'],
  },
  usedReceipts: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const ReceiptBookModel = model('ReceiptBook', ReceiptBookSchema);
