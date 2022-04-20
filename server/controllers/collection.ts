import express, { Express, Request, Response, NextFunction } from 'express';
import { request } from 'http';
import connection from '../connect';

const sql_createCollection = `INSERT INTO collection(amount, img_url, description) VALUES(?)`;

const createCollection = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  if (!req.body.amount) {
    res.status(500).json({
      status: 'failure',
      message: 'amount not specified'
    })
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
  console.log(req.body)
  console.log(req.params)
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
        data
      });
    }
  );
};

export {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
};
