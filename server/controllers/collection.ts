import { Request, Response, NextFunction } from 'express';
import connection from '../connect';
import { CustomRequest, LNDRPC, emitSocketEvent } from '../index';

const sql_createCollection = `INSERT INTO collection(amount, img_url, description) VALUES(?)`;

const createCollection = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.amount) {
    res.status(500).json({
      status: 'failure',
      message: 'amount not specified',
    });
  }
  let values = [req.body.amount, req.body.img_url, req.body.description];
  connection.query(sql_createCollection, [values], (err, data, fields) => {
    if (err) {
      return next(err.message);
    }
    res.status(201).json({
      status: 'success',
      message: 'collection created',
    });
  });
};

const sql_getCollections = `SELECT * FROM collection`;

const getAllCollections = (req: Request, res: Response, next: NextFunction) => {
  connection.query(sql_getCollections, (err, data, fields) => {
    if (err) {
      return next(err.message);
    }
    res.status(200).json({
      status: 'success',
      length: data?.length,
      collection: data,
    });
  });
};

const sql_getCollectionsById = `SELECT * FROM collection where id = ?`;

const getCollectionById = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    throw new Error('No collection id found');
  }
  connection.query(
    sql_getCollectionsById,
    [req.params.id],
    (err, data, fields) => {
      if (err) {
        return res.status(500);
      }
      res.status(200).json({
        status: 'success',
        length: data?.length,
        collection: data,
      });
    }
  );
};

const sql_updateCollectionById = `
    UPDATE collection SET ? WHERE ?
`;
const updateCollectionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  console.log(req.params);
  connection.query(
    sql_updateCollectionById,
    [req.body, req.params],
    (err, data, fields) => {
      if (err) {
        res.status(500);
      }
      res.status(201).json({
        status: 'success',
        message: 'Collection updated!',
        data,
      });
    }
  );
};

const addInvoiceToCollection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let hash = Buffer.from(req.invoice.rHash, 'base64').toString('hex');
  const rpc = await LNDRPC();
  const response = await rpc.lookupInvoice({
    rHashStr: hash,
    rHash: req.params.rHash
  });

  let rhash = Buffer.from(response.rHash).toString('base64');
  let preImg = Buffer.from(response.rPreimage).toString('base64');

  response.rHash = rhash;
  response.rPreimage = preImg

  try {
    let invoice = response;
    let collectionField = {
      invoice_hash: invoice.rHash,
      invoice_pay_req: invoice.paymentRequest,
      invoice_expiry: invoice.expiry,
      invoice_settled: invoice.settled || false,
      invoice_create_date: invoice.creationDate,
    };
    let collectionID = {
      collection_id: req.invoice.collection_id
    }

    console.log('collection addInvoiceToCollection ', collectionField);
    connection.query(sql_updateCollectionById, [collectionField, collectionID], (error, results, fields) => {
      if (error) {
        throw new Error(error.message)
      }
      console.log('update collection on invoice success ', {results})
    })
  } catch (error) {}

  
  res.status(200).json(response)


  const call = await rpc.subscribeInvoices({
    addIndex: `${req.invoice.addIndex}`
  })

  call.on('data', function (response) {
    console.log('event call data ', response)

    if (response.settled) {

      updateCollectionOnInvoiceSettled(req.invoice.collection_id, response);
      emitSocketEvent.emit('invoice-paid', response.settled)
    }
  })
};

const updateCollectionOnInvoiceSettled = (collection_id, fields) => {
  console.log('updateCollectionOnInvoiceSettled ', {collection_id})
  try {
    let collectionField = {
      invoice_settled: fields.settled || false,
    };
    let collectionID = {
      collection_id: collection_id
    }
    connection.query(sql_updateCollectionById, [collectionField, collectionID], (error, results, fields) => {
      if (error) {
        throw new Error(error.message)
      }
    })
  } catch (error) {
    console.log('updateCollectionOnInvoiceSettled error ', error)
  }

}

export {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
  addInvoiceToCollection,
};
