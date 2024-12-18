import { model, Schema } from 'mongoose';

import { IdCode, ModeOfPayment, Receipt } from '../generated/graphql';

const indianMobileNumberPattern = /^[6-9]\d{9}$/;
const panNumberPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const financialYearPattern = /^[0-9]{4}-[0-9]{4}$/;

const ReceiptSchema = new Schema<Receipt>({
  uuid: { type: String, required: true, unique: true },
  receiptNumber: { type: Number, required: true, unique: true },
  financialYear: {
    type: String,
    required: false,
    match: [financialYearPattern, 'Please enter a valid financial year (2023-2024)'],
  },
  date: { type: Date, required: false },
  mobileNumber: {
    type: String,
    required: [false, 'Mobile number is required'],
    match: [indianMobileNumberPattern, 'Please enter a valid Indian mobile number'],
  },
  name: { type: String, required: [true, 'Name is required'] },
  address: { type: String, required: false },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount should be at least 1'],
  },
  modeOfPayment: { type: String, required: true, default: ModeOfPayment.Cash, enum: ModeOfPayment },
  aadharNumber: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        // Aadhar number should be 12 digits
        return v == null || /^\d{12}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Aadhar number!`,
    },
  },
  panNumber: {
    type: String,
    required: false,
    match: [panNumberPattern, 'Please enter a valid PAN number'],
  },
  idCode: {
    type: String,
    enum: IdCode,
    required: false,
  },
  cancelled: {
    type: Boolean,
    required: false,
    default: false,
  },
  receiptBook: {
    type: Schema.Types.ObjectId,
    ref: 'ReceiptBook',
    required: true,
  },
});

export const ReceiptModel = model('Receipt', ReceiptSchema);
