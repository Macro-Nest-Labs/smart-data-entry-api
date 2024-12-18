import { Request, Response } from 'express';

import { logger } from '../logger';
import { ReceiptModel } from '../models/receipt';
import { exportReceiptsToExcel } from '../utils/exportReceiptsToExcel';

export const downloadExcel = async (
  req: Request<Record<string, never>, Record<string, never>, Record<string, never>, { startDate: string; endDate: string }>,
  res: Response,
) => {
  logger.info(`req.originalURL: ${req.originalUrl}`);
  logger.info('Preparing receipts for download...');

  const { startDate, endDate } = req.query;

  try {
    const query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
    const receipts = await ReceiptModel.find(query).populate('receiptBook');

    if (!receipts || receipts.length === 0) {
      return res.status(404).json({ error: '[+] No receipts found for this date range.' });
    }

    const buffer = exportReceiptsToExcel(receipts);

    // Set headers to trigger download
    res.setHeader('Content-Disposition', 'attachment; filename="ReceiptBooks.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    logger.info('Excel file generated');

    // Send the buffer
    res.send(buffer);
  } catch (error) {
    console.error('Error downloading receipts', error);
    res.status(500).json({ error: '[+] Error fetching listings.' });
  }
};
