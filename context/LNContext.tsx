import React, { useState, FC, Fragment, useEffect } from 'react';
import {
  connect,
  createAddress,
  createInvoice,
  getAllCollections,
  getEventsSocket,
  getInvoice,
} from '../api';
import { getData, storeData } from '../utils/storage';

export const SocketEvents = {
  postUpdated: 'post-updated',
  invoicePaid: 'invoice-paid',
};

interface Props {
  children: React.ReactNode;
}

export const LNContext = React.createContext(undefined);

export const LNContextProvider = ({ children }: Props) => {
  const [pubKey, setPubkey] = useState('');
  const [showPayModal, setShowPayModal] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [paymentHash, setPaymentHash] = useState('');
  const [invoiceCreated, setInvoiceCreated] = useState('');
  const [invoiceSettled, setInvoiceSettled] = useState(false);
  const [invoiceMemo, setInvoiceMemo] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');
  const [paymentErrorMsg, setPaymentErrorMsg] = useState('');
  const [error, SetError] = useState('');
  const [collections, setCollections] = useState([])

  useEffect(() => {
    let init = async () => {
      const connectResponse = await connect()
      console.log('init websocket in useEffect');
      // connect to websocket and listen for events
      const ws = getEventsSocket();
      ws.addEventListener('message', onSocketMessage);
      handleGetCollections()
    };
    init();
  }, []);

  const onSocketMessage = (msg: MessageEvent) => {
    const event = JSON.parse(msg.data);
    console.log('call onSocketMessage ############################ event ', event)

    if (event.type === SocketEvents.invoicePaid) {
      const { hash, amount, pubkey: pubkeyFromEvent } = event.data;

      console.log(
        '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< onSocketMessage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',
        { event }
      );

      // if the incoming payment is made for the
      // pmtHash that we are waiting for
      if (hash === paymentHash) {
      }

      // update when an invoice is paid to the current user
      if (pubkeyFromEvent === pubKey) {
      }
    } else {
      console.log(
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ onSocketMessage NO EVENT OOOOOOOO $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ',
        { event }
      );
    }
  };

  const createPaymentRequest = async () => {
    try {
      const request = {
        memo: 'New memo',
        expiry: 3600,
        amount: 10,
        private: false,
      };
      const response = await createInvoice(request);
      console.log('createPaymentRequest response is ', response.data.invoice);

      const { add_index, payment_addr, payment_request, r_hash } =
        response.data.invoice;

      const invoiceData = await getInvoiceData(r_hash);

      setInvoiceCreated(invoiceData.creation_date);
      setInvoiceSettled(invoiceData.settled);
      setInvoiceMemo(invoiceData.memo);
      setInvoiceValue(invoiceData.value);
      setPaymentRequest(payment_request);
    } catch (error) {
      console.log('calling createPaymentRequest error ', error);
      return { error };
    }
  };

  const getInvoiceData = async (invoiceHash) => {
    try {
      const response = await getInvoice(invoiceHash);
      console.log(
        '<<<<<<<<< getInvoiceData response is >>>>>>>>>> ',
        response.data
      );
      return response;
    } catch (error) {
      console.log('calling getInvoiceData error ', error);
      return { error };
    }
  };

  const handleGetCollections = async () => {
    try {
      const response = await getAllCollections()
      console.log(
        '<<<<<<<<< handleGetCollections response is >>>>>>>>>> ',
        response.data.collection
      );
      setCollections(response.data.collection)
    } catch (error) {
      console.log('calling handleGetCollections error ', error);
      return { error };
    }
  }

  const contextValue = {
    createPaymentRequest,
    paymentRequest,
    handleGetCollections,
    collections
  };

  return (
    <LNContext.Provider value={contextValue}>{children}</LNContext.Provider>
  );
};

// cron job will be checking db for all the invoices
//
