import express, {Express, Request, Response} from 'express';
import fs from 'fs';
import request from 'request';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
import createLnRpc, { LnRpc } from '@radar/lnrpc';
import cors from 'cors';

const config = {
    LN_BASE_URL: 'https://localhost:8080/v1'
}

export interface CustomRequest extends Request {
  ln_address?: string;
}

/** TO DO: move to env file */
const macaroon = fs.readFileSync('/Users/bigtobz/.lnd1/data/chain/bitcoin/regtest/admin.macaroon').toString('hex');
const lndCert = fs.readFileSync('/Users/bigtobz/.lnd1/tls.cert').toString('hex');

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


const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};


let pword = Buffer.from('password@007').toString('base64');

let requestBody = { 
    wallet_password: pword,
}

const app: Express = express();
app.use(cors({ origin: '*' }));

const port = 3000;



app.get('/', (req: Request, res: Response) => {
    res.json({
        macaroon
    })
});

const generateLNAddress = async (req: CustomRequest, res: Response, next: any) => {
    console.log('generating new address...')
    let options = {
        url: `${config.LN_BASE_URL}/newaddress`,
        rejectUnauthorized: false,
        json: true,
        headers: {
            'Grpc-Metadata-macaroon': macaroon,
        }
    }

    let address;

    request.get(options, (error, response, body) => {
        address = body.address;
        
        req.ln_address = address;
        next()
    })
}

app.get('/create-address', generateLNAddress,  async (req: CustomRequest, res: Response, next) => {
   try {
       let address = req.ln_address;
       console.log('create-address ', address)
       res.json({
           address
       })
   } catch (error) {
       console.log('error is ', error)
       next(error)
   }

})

// app.post('/', (req, res) => {
//     res.send('Got a post request');
// });

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});