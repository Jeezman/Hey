import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants';

axios.defaults.baseURL = BASE_URL;

type ServerError = {
  error: string;
};
type Data = {
  data: string;
};


export const connect = async (): Promise<any> => {
  try {
    const res = await axios.get<Data>('');
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
  } catch (error) {}
};
