import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://192.168.0.157:3000/';
const WS_URL = 'ws://192.168.0.157:3000/events/';
// axios.defaults.baseURL = 'http://192.168.43.14:3000/';
// const WS_URL = 'ws://192.168.43.14:3000/events';

type ServerError = {
  error: string;
};
type Data = {
  data: string;
};

export const getEventsSocket = () => {
  console.log('call getEventsSocket ############################');
  return new WebSocket(WS_URL);
};

export const connect = async (): Promise<any> => {
  try {
    const res = await axios.get<Data>('');
    console.log('call connect api ############################', res.data);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('calling error ', error);
    return { error };
  }
};

export const createAddress = async (): Promise<any> => {
  try {
    const res = await axios.get<Data>('create-address');
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('calling error ', error);
    return { error };
  }
};

export const createInvoice = async (request): Promise<any> => {
  try {
    const res = await axios.post<Data>('invoice/create', request);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('calling error ', error);
    return { error };
  }
};

export const getInvoice = async (invoiceHash): Promise<any> => {
  let _hash = encodeURIComponent(invoiceHash);
  console.log({ invoiceHash, _hash });
  try {
    const res = await axios.get<Data>(`invoice/${_hash}`);
    subscribeToInvoice(_hash);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('getInvoice error ', error);
    return { error };
  }
};

export const subscribeToInvoice = async (invoiceHash): Promise<any> => {
  // let _hash = encodeURIComponent(invoiceHash)
  // console.log({invoiceHash, _hash})

  console.log(
    'call subscribeToInvoice ############################',
    invoiceHash
  );
  return new WebSocket(`${WS_URL}?hash=${invoiceHash}`);

  /**
  try {
    const res = await axios.get<Data>(`invoice/${_hash}`);;
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('getInvoice error ', error);
    return { error };
  }
   */
};

const INVOICE_EXPIRY = '3600'

export const getAllCollections = async (): Promise<any> => {
  try {
    const collections = await axios.get<Data>(`collection`);
    return collections;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('getAllCollections error ', error);
    return { error };
  }
};

export const addInvoiceToCollection = async (collection): Promise<any> => {
  try {
    console.log('addInvoiceToCollection collection ', collection);
    const res = await axios.put<Data>(
      `collection/add-invoice/${collection.collection_id}`,
      {
        memo: collection.description,
        expiry: INVOICE_EXPIRY,
        amount: collection.amount,
        private: false,
      }
    );
    return res;
    // console.log('addInvoiceToCollection response ', res);
  } catch (error) {}
};
