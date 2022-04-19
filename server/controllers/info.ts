import { NextFunction, Request, Response } from 'express';
import { macaroon, config } from '../index';
import request from 'request-promise';

export const getInfo = async () => {
  let options = {
    url: `${config.LN_BASE_URL}/getinfo`,
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  };

//   let data;

  const fetch = await request.get(options).then(response => {
    //   console.log('rssss is ', response)
      return response;
  })

  return fetch;

  console.log('fetch passss ', fetch)

//   request.get(options, function (error, response, body) {
//     try {
//     //   res.status(200).json(body)
//     console.log('body is ', body)
//       return body
//     } catch (err) {
//       console.log('getInfo error ', error);
//     }
//   });
};
