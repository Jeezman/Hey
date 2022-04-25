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

  const fetch = await request.get(options).then(response => {
      return response;
  })

  return fetch;
};
