import React, { useState, useEffect } from 'react';
import { createAddress } from '../api';
import { getData, storeData } from '../utils/storage';

interface IOnboardContext {
  address: string;
  data: null;
  handleLogin?: () => {};
}

const defaultState = {
  data: null,
  address: '',
};

interface Props {
  children: React.ReactNode;
}

export const OnboardContext = React.createContext<IOnboardContext>(defaultState);

export const OnboardContextProvider = ({
  children,
}: Props) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    let getStoredData = async () => {
      let storedAddress = await getData('address');
      if (storedAddress) setAddress(storedAddress);
    }
    getStoredData();
  }, [])

  const handleLogin = async () => {
    const response = await createAddress();
    setAddress(response?.data?.address);
    alert(response?.data?.address)
    storeData('address', response.data.address)
  };

  const contextValue = {
    address,
    data: null,
    handleLogin,
  };

  return (
    <OnboardContext.Provider value={contextValue}>
      {children}
    </OnboardContext.Provider>
  );
};
