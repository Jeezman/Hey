import express, { Express, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import createLnRpc, { LnRpc } from '@radar/lnrpc';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressWs from 'express-ws';
import { createInvoice, getInvoice } from './controllers/invoice';
import { loggerMiddleware } from './middleware/logger';
import { getInfo } from './controllers/info';
import NodeManager, { NodeEvents } from './node-mgt';
import { getAllCollections, createCollection, updateCollectionById } from './controllers/collection';

export const config = {
  LN_BASE_URL: 'https://localhost:8080/v1',
  LN_BASE_URL_V2: 'https://localhost:8080/v2',
  WSS_URL: 'localhost:8080/v2/',
};

const { app } = expressWs(express());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

const port = 3000;

export interface CustomRequest extends Request {
  ln_address?: string;
  invoice?: any;
}

/** TO DO: move to env file */
export const macaroon = fs
  .readFileSync(
    '/Users/bigtobz/.lnd1/data/chain/bitcoin/testnet/admin.macaroon'
  )
  .toString('hex');
export const lndCert = fs.readFileSync('/Users/bigtobz/.lnd1/tls.cert');

export const LNDRPC = async () => {
  try {
    const rpc = await createLnRpc({
      server: 'localhost:10009',
      cert: lndCert,
      macaroon: macaroon,
    });

    return rpc;
  } catch (error) {
    console.log('fail rpc connect ', error);
  }
};

// async function connect(): Promise<any> {
//     try {
//         const rpc = await createLnRpc({
//             server: 'https://localhost:8080',
//             cert: Buffer.from(lndCert, 'hex').toString('utf-8'),
//             macaroon
//         })

//         const { identityPubkey: pubkey } = await rpc.getInfo()

//     } catch (error) {
//         console.log("<<<<< ", error)
//     }
// }

let pword = Buffer.from('password@007').toString('base64');

let requestBody = {
  wallet_password: pword,
};

app.get('/', async (req: Request, res: Response) => {
  const pubkey = await NodeManager.connect();
  console.log('connect endpoint called ', pubkey);
  res.json({
    macaroon,
    pubkey,
  });
});

app.ws('/', function (ws, req) {
  ws.on('message', function (msg) {
    ws.send(msg);
  });
  console.log('web socket connected');
});

const generateLNAddress = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  console.log('generating new address...');

  const rpc = await LNDRPC();

  const response = await rpc.newAddress();

  console.log('response ', response)

  req.ln_address = response.address
  next()

  /** 
   * REST OPTION
  let options = {
    url: `${config.LN_BASE_URL}/newaddress`,
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  };

  let address;

  request.get(options, (error, response, body) => {
    address = body.address;

    req.ln_address = address;
    next();
  });*/
};

app.get(
  '/create-address',
  generateLNAddress,
  async (req: CustomRequest, res: Response, next) => {
    try {
      let address = req.ln_address;
      console.log('create-address ', address);
      res.json({
        address,
      });
    } catch (error) {
      console.log('error is ', error);
      next(error);
    }
  }
);

app.post(
  '/invoice/create',
  createInvoice,
  async (req: CustomRequest, res: Response, next) => {
    try {
      let invoice = req.invoice;
      let hash = Buffer.from(req.invoice.rHash).toString('base64')
      invoice.rHash = hash;
      console.log('invoice/create hash ', hash)
      console.log('create-invoice ', invoice);
      res.json({
        invoice,
      });
    } catch (error) {
      console.log('error is ', error);
      next(error);
    }
  }
);

app.get('/invoice/:rHash', getInvoice);

app.get('/get-info', async (req: Request, res: Response) => {
  let info = await getInfo();

  res.status(201).json(info);
});

app.get('/collection', getAllCollections)
app.post('/collection', createCollection)
app.put('/collection/:collection_id', updateCollectionById)



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
