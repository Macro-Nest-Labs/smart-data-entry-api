import { Document, Types } from 'mongoose';
import XLSX from 'xlsx';

import { Receipt } from '../generated/graphql';

export function exportReceiptsToExcel(
  receipts: Omit<
    // eslint-disable-next-line @typescript-eslint/ban-types
    Document<unknown, {}, Receipt> &
      Receipt & {
        _id: Types.ObjectId;
      },
    never
  >[],
) {
  const receiptsData = receipts.map((receipt) => ({
    ReceiptNumber: receipt.receiptNumber,
    ReceiptBookNumber: receipt.receiptBook.receiptBookNumber,
    ModeOfPayment: receipt.modeOfPayment,
    DonorName: receipt.name,
    DonorAddress: receipt.address,
    IdCode: receipt.idCode,
    AadharNumber: receipt.aadharNumber,
    PANNumber: receipt.panNumber,
    MobileNumber: receipt.mobileNumber,
    DonationAmount: receipt.amount,
    ReceiptDate: receipt.date,
    FinancialYear: receipt.financialYear,
  }));

  const worksheet = XLSX.utils.json_to_sheet(receiptsData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Receipts');

  // Temporarily write to buffer and return the buffer
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
