import { NextFunction, Request, Response } from 'express';
import { CustomRequest, LNDRPC } from '../index';

interface InvoiceRequest {
  memo?: string;
  private?: boolean;
  expiry?: string;
  value_msat?: number;
  value?: string;
  collection_id?: string;
}

export const createInvoice = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody: InvoiceRequest = {
      memo: req.body.memo,
      private: JSON.parse(req.body.private),
      expiry: req.body.expiry,
    };

    if (req.body.amount > 0 && req.body.amount < 1) {
      requestBody.value_msat = req.body.amount * 1000;
    } else {
      requestBody.value = req.body.amount;
    }
    const rpc = await LNDRPC();

    const response = await rpc.addInvoice(requestBody);
    req.invoice = response;
    if (req.params.collection_id) {
      req.invoice.collection_id = req.params.collection_id;
    }
    next();
  } catch (error) {
    console.log('createInvoice error ', error);
  }
};

export const getInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let hash = Buffer.from(req.params.rHash, 'base64').toString('hex');

  const rpc = await LNDRPC();
  const response = await rpc.lookupInvoice({
    rHashStr: hash,
    rHash: req.params.rHash,
  });

  let rhash = Buffer.from(response.rHash).toString('base64');
  let preImg = Buffer.from(response.rPreimage).toString('base64');

  response.rHash = rhash;
  response.rPreimage = preImg;
  res.status(200).json(response);
};
