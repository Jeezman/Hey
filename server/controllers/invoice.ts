import { NextFunction, Request, Response } from 'express';
import { macaroon, config, CustomRequest, LNDRPC } from '../index';
import request from 'request';

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

   
    // console.log('create invoice request is ', req.body);
    // console.log('create invoice request params is ', req.params);
    const requestBody: InvoiceRequest = {
      memo: req.body.description,
      private: JSON.parse(req.body.private),
      expiry: req.body.expiry,
    };
 
    if (req.body.amount > 0 && req.body.amount < 1) {
      requestBody.value_msat = req.body.amount * 1000;
    } else {
      requestBody.value = req.body.amount;
    }

/**
     * REST IMPLEMENTATION
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
    */
   const rpc = await LNDRPC();

   const response = await rpc.addInvoice(requestBody);

  //  console.log('creating invoice rpc ', {response})
    req.invoice = response;
    if (req.params.collection_id) {
      req.invoice.collection_id = req.params.collection_id;
    }
   next();

  } catch (error) {
    console.log('createInvoice error ', error);
  }
};

export const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
  let hash = Buffer.from(req.params.rHash, 'base64').toString('hex');

  console.log('getInvoice hash ', {param: req.params.rHash, hash})

  const rpc = await LNDRPC();
  const response =  await rpc.lookupInvoice({
    rHashStr: hash,
    rHash: req.params.rHash
  })

  let rhash = Buffer.from(response.rHash).toString('base64')
  let preImg = Buffer.from(response.rPreimage).toString('base64')

  response.rHash = rhash;
  response.rPreimage = preImg
  res.status(200).json(response)

  console.log('get invoice response settled is ', response.settled)

  const call = await rpc.subscribeInvoices({
    addIndex: '91'
  })

  call.on('data', function(response) {
    console.log('received data response ', response)
  })
  call.on('status', function(status) {
    console.log('status of stream ', status)
  })

  

  /**
   * 
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
  */
};

// export const subscribeToInvoice = ()
