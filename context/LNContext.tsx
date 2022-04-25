import React, { useState, useEffect } from 'react';
import { connect, getAllCollections, addInvoiceToCollection } from '../api';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

const socket = io(SOCKET_URL);

interface Props {
  children: React.ReactNode;
}

export const LNContext = React.createContext(undefined);

export const LNContextProvider = ({ children }: Props) => {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [invoiceCreated, setInvoiceCreated] = useState('');
  const [invoiceSettled, setInvoiceSettled] = useState(false);
  const [invoiceMemo, setInvoiceMemo] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let init = async () => {
      const connectResponse = await connect();
      getEventsSocket();

      handleGetCollections();
    };
    init();
  }, []);

  useEffect(() => {
    if (invoiceSettled) {
      handleGetCollections();
      setInvoiceSettled(true);
    }
  }, [invoiceSettled]);

  const getEventsSocket = () => {
    socket.on('invoice-paid', (arg) => {
      setInvoiceSettled(arg);
    });
  };

  const handleGetCollections = async () => {
    try {
      const response = await getAllCollections();
      setCollections(response.data.collection);
    } catch (error) {
      console.log('calling handleGetCollections error ', error);
      return { error };
    }
  };

  const handleAddInvoiceToCollection = async (collection) => {
    try {
      const response = await addInvoiceToCollection(collection);
      let invoiceData = response.data;
      setInvoiceCreated(invoiceData.creationDate);
      setInvoiceSettled(invoiceData.settled || false);
      setInvoiceMemo(invoiceData.memo);
      setInvoiceValue(invoiceData.value);
      setPaymentRequest(invoiceData.paymentRequest);
    } catch (error) {
      console.log('handleAddInvoiceToCollection ', error);
    }
  };

  const contextValue = {
    paymentRequest,
    setPaymentRequest,
    handleGetCollections,
    collections,
    handleAddInvoiceToCollection,
    invoiceSettled,
    invoiceValue,
    setInvoiceSettled
  };

  return (
    <LNContext.Provider value={contextValue}>{children}</LNContext.Provider>
  );
};