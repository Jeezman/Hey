import { NextFunction, Request, Response } from 'express';
import { macaroon, config, CustomRequest } from '../index';
import request from 'request';

interface InvoiceRequest {
  memo: string;
  private: boolean;
  expiry: number;
  value_msat?: number;
  value?: number;
}

export const createInvoice = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('create invoice request is ', req.body);
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

    let options = {
      url: `${config.LN_BASE_URL}/invoices`,
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
      form: JSON.stringify(requestBody),
    };

    let _data;
    request.post(options, function (error, response, body) {
      _data = body;
      req.invoice = _data;
      next();
    });
  } catch (error) {
    console.log('createInvoice error ', error);
  }
};

export const getInvoice = (req: Request, res: Response, next: NextFunction) => {
  let hash = Buffer.from(req.params.rHash, 'base64').toString('hex');

  let options = {
    url: `${config.LN_BASE_URL}/invoice/${hash}`,
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  };

  request.get(options, function (error, response, body) {
    try {
      res.status(200).json(body)
    } catch (err) {
      console.log('getInvoice error ', error);
    }
  });
};
