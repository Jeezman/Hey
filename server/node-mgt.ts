import { getInfo } from './controllers/info';
import { config, lndCert, macaroon, LNDRPC} from './index';
import { EventEmitter } from 'stream';
import { WebSocket } from 'ws';
import request from 'request';
import createLnRpc, { LnRpc } from '@radar/lnrpc';

export const NodeEvents = {
  invoicePaid: 'invoice-paid',
};

class NodeManager extends EventEmitter {
    // rest connnect
//   async connect() {
//     try {
//       console.log('NodeManager connect');
//       const { identity_pubkey: pubkey } = await getInfo();

//       // listen for payments from LND
//       console.log('NodeManager connected pubkey ', pubkey);
//       // this.listenForPayments(pubkey)
//       return pubkey;
//     } catch (error) {}
//   }

async connect() {
    console.log('calling rpc connect')
    const rpc = await LNDRPC()

    const info = await rpc.getInfo();
    console.log('rpc info ', info)
    // try {
    //     const rpc = await createLnRpc({
    //         server: 'localhost:10009',
    //         cert: lndCert,
    //         macaroon: macaroon
    //     })

    //     const { identityPubkey: pubkey } = await rpc.getInfo()
    //     console.log('rpc info ', pubkey)
    // } catch (error) {
    //     console.log('fail rpc connect ', error)
    // }

}

  /**
   * listen for payments made to the node. When a payment is settled, emit the
   * `invoicePaid` event to notify listeners of the node manager
   */
  listenForPayments(hash: any) {
    try {
      let _hash = Buffer.from(hash, 'base64').toString('hex');
      console.log(
        '--------------------- starting listenForPayments ---------------------',
        { hash, _hash }
      );
      // const wsUrl = 'wss://' + config.WSS_URL + 'invoices/subscribe/'+hash;
      // const wsUrl = config.LN_BASE_URL_V2 + '/invoices/subscribe/'+hash;

      // let ws = new WebSocket(wsUrl, {
      //     // Work-around for self-signed certificates.
      //     rejectUnauthorized: false,
      //     headers: {
      //       'Grpc-Metadata-Macaroon': macaroon,
      //     },
      //   });
      let options = {
        url: `https://localhost:8080/v1/invoices/subscribe`,
        // url: `https://localhost:8080/v2/invoices/subscribe/${hash}`,
        // Work-around for self-signed certificates.
        rejectUnauthorized: false,
        json: true,
        headers: {
          'Grpc-Metadata-macaroon': macaroon,
        },
      };

        let _response = request.get(options, function (error, response, body) {
          try {
              console.log('_response')
          } catch (err) {
            console.log('getInvoice error ', error);
          }
        });

        _response.on('data', (data) => {
            console.log('respons data ', data)
        })

    //   request.get(options, function (error, response, body) {
    //     console.log('check body ', body);
    //     if (body != undefined) {
    //       var jsonBody = [body];
    //       if (typeof body !== 'object') {
    //         // crazy. lnd returns stream with _two_ json objects, not in an array -> enforce arr
    //         body = body.replace(/}}}/g, '}}},');
    //         console.log('body is ***************** ', body);
    //         body = body.sbustring(0, body.length - 2);

    //         var jsonString = '[' + body + ']';
    //         jsonBody = JSON.parse(jsonString);

    //         console.log('jsonBody is ***************** ', jsonBody);
    //       }
    //     }
    //   });


      //   let res = await _response

      //   res.on('data', (data) => {
      //       console.log('data responseeeeeeeeee is ', data)
      //   })

      //  console.log('res ............. ', res)

      //   console.log(' listenForPayments response is ', _response)
      //   console.log('--------------------- end listenForPayments ---------------------')

      //   _response.on('data', (invoice) => {
      //       console.log('--------------------- listenForPayments stream response ---------------------', invoice)
      //       Buffer.from(invoice, 'base64').toString('hex')
      //   })
      //   _response.on(NodeEvents.invoicePaid, (data) => {
      //       console.log('data issssssssss ', data)
      //   })

      //   _response.on(NodeEvents.invoicePaid, ())

      // ws.on('open', () => {
      //     console.log('---------------------listenForPayments ws open---------------------')
      //     ws.send('probably nothing')
      // })
      // ws.on('data', invoice => {
      //     console.log('++++++++++++++listenForPayments inside ws on event++++++++++++++++++++++++++++ ', invoice)
      //     // if (invoice.settled) {
      //     //     const hash = (invoice.rHash as Buffer).toString('base64');
      //     //     const amount = invoice.amtPaidSat;
      //     //     this.emit(NodeEvents.invoicePaid, {hash, amount, pubkey})
      //     // }
      // })
      // ws.on('close', (code, reason) => {
      //     console.log('++++++++++++++listenForPayments web socket closed ++++++++++++++', {code, reason})
      //     ws.send('Connection closed')
      // })
    } catch (error) {
      console.log('++++++++++++++ listenForPayments error ++++++++++++++', {
        error,
      });
    }
  }
}

export default new NodeManager();
