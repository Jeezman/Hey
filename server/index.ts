import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import createLnRpc, { LnRpc } from '@radar/lnrpc';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createInvoice, getInvoice } from './controllers/invoice';
import { loggerMiddleware } from './middleware/logger';
import { getInfo } from './controllers/info';
import {
  getAllCollections,
  createCollection,
  updateCollectionById,
  addInvoiceToCollection,
} from './controllers/collection';
import dotenv from 'dotenv';
import http from 'http'



dotenv.config();

export const config = {
  LN_BASE_URL: process.env.LN_BASE_URL,
  LN_BASE_URL_V2: process.env.LN_BASE_URL_V2,
  WSS_URL: process.env.WSS_URL,
  PORT: process.env.PORT,
};

const app = express();
let _http = new http.Server(app)
const io = require('socket.io')(_http);
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);



let emitSocketEvent;

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('hello', 'fuck you from index');

  emitSocketEvent = socket;
})


export { emitSocketEvent };

  

export interface CustomRequest extends Request {
  ln_address?: string;
  invoice?: any;
}

export const macaroon = fs
  .readFileSync(process.env.MACAROON)
  .toString('hex');
export const lndCert = fs.readFileSync(process.env.LND_CERT);

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

app.get('/', async (req: Request, res: Response) => {
  res.json({
    macaroon,
  });
});


const generateLNAddress = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  console.log('generating new address...');

  const rpc = await LNDRPC();

  const response = await rpc.newAddress();

  req.ln_address = response.address;
  next();
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
      let hash = Buffer.from(req.invoice.rHash).toString('base64');
      invoice.rHash = hash;
      console.log('invoice/create hash ', hash);
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

app.get('/collection', getAllCollections);
app.post('/collection', createCollection);
app.put('/collection/:collection_id', updateCollectionById);
app.put(
  '/collection/add-invoice/:collection_id',
  createInvoice,
  addInvoiceToCollection
);




const server = _http.listen(config.PORT, () => {
  console.log('App listening on port ' + config.PORT);
})