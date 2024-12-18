import { DateTimeResolver } from 'graphql-scalars';

import * as Common from './common.resolve';
import * as Receipt from './receipt.resolve';
import * as ReceiptBook from './receipt_book.resolve';
import * as User from './user.resolve';
import * as UserRole from './user_role.resolve';

export const scalars = [{ Date: DateTimeResolver }];

export const gqlModules = [Common, Receipt, ReceiptBook, User, UserRole];
