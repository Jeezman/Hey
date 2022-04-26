import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { LNContext } from '../context/LNContext';
import QRCode from 'react-qr-code';
import { useCallback, useContext, useEffect, useState } from 'react';
import { commaify, ellipsisSandwich } from '../utils/formatters';
import { CopyIcon, XIcon, CheckIcon } from '../assets/images/icons';
import * as Clipboard from 'expo-clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackScreenProps } from '../types';

export default function ModalScreen({ navigation }: RootStackScreenProps<'Modal'>) {
  const {
    paymentRequest,
    setPaymentRequest,
    invoiceSettled,
    setInvoiceSettled
  } = useContext(LNContext);
  const [isCopy, setIsCopy] = useState(false);

  const copyToClipboard = async () => {
    Clipboard.setString(paymentRequest);

    const text = await Clipboard.getStringAsync();
    if (text === paymentRequest) {
      setIsCopy(true);
    }
  };

  const onCloseModal = () => {
    setPaymentRequest(null);
    setInvoiceSettled(false);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsCopy(false);
      };
    }, [])
  );

  return (
    <Container>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'light'} />
      {invoiceSettled ? (
        <PaySuccess />
      ) : (
        <>
          {!!paymentRequest && (
            <QRCodeWrap>
              <QRCode value={paymentRequest} />
              <QRPayReqText>
                {ellipsisSandwich(paymentRequest, 10)}
              </QRPayReqText>
            </QRCodeWrap>
          )}
        </>
      )}

      {!invoiceSettled ? (
        <ButtonWrap>
          <PurchaseButton onPress={onCloseModal} style={{ marginRight: 15 }}>
            <XIcon width={24} height={24} color="#000" />
            <PurchaseButtonText style={{ marginLeft: 5 }}>
              CANCEL
            </PurchaseButtonText>
          </PurchaseButton>
          <PurchaseButton onPress={copyToClipboard}>
            <CopyIcon width={24} height={24} color="#000" />
            <PurchaseButtonText style={{ marginLeft: 5 }}>
              {isCopy ? 'COPIED' : 'COPY'}
            </PurchaseButtonText>
          </PurchaseButton>
        </ButtonWrap>
      ) : (
        <ButtonWrap>
          <PurchaseButton onPress={onCloseModal} style={{ marginRight: 15 }}>
            <PurchaseButtonText style={{ marginLeft: 5 }}>
              GO BACK
            </PurchaseButtonText>
          </PurchaseButton>
        </ButtonWrap>
      )}
    </Container>
  );
}

const PaySuccess = () => {
  return (
    <PaySuccessView>
      <CheckIcon color="#fff" />
      <QRPayReqText style={{color: "#fff", marginBottom: 35, fontSize: 20, fontWeight: 'bold'}}>
              Payment Successfull!!
        </QRPayReqText>
    </PaySuccessView>
  );
};

const PaySuccessView = styled.View`
  background: #81de99;
  padding: 15px;
  height: 42%;
  width: 68%;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const ButtonWrap = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PurchaseButton = styled.TouchableOpacity`
  height: 46px;
  width: 40%;
  background: #fff;
  border: 1px solid #dedede;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PurchaseButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
`;

const QRCodeWrap = styled.View`
  background: #f8f8f8;
  padding: 15px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 45px;
  background: #fff;
`;

const QRPayReqText = styled.Text`
  color: #777777;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-top: 10px;
`;