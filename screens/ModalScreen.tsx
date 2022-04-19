import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { LNContext } from '../context/LNContext';
import QRCode from 'react-qr-code';
import { useCallback, useContext, useEffect, useState } from 'react';
import { commaify, ellipsisSandwich } from '../utils/formatters';
import { CopyIcon, XIcon } from '../assets/images/icons';
import * as Clipboard from 'expo-clipboard';
import { useFocusEffect } from '@react-navigation/native';

export default function ModalScreen({navigation}) {
  const { paymentRequest } = useContext(LNContext);
  const [isCopy, setIsCopy] = useState(false);

  let req =
    'lntb100n1p39urc5pp5tu3glvfcfnwqr78hmjcw77qv8hmxjz6v3jajkas3nvwffahfa2jsdp6dp68gurn8ghj7mt9v46zuem0dankcefwvdhk6tmxd96z67nzw93j6erjwvcqzpgxqrrsssp5394vplcef4dz2eqld97654wmn0wdr6sx2v4048dyyq3p9dwp59ms9qyyssqafyx4nrpmzjnnvh7lsrnn0khgxac7e028x8c5m4vep8vdu62lfahy9jhe550ndljtgck85tfkn6pd3lq9570frfrkad3x5aq8w9atcgpwejsn2';

  const copyToClipboard = async () => {
    Clipboard.setString(req);

    const text = await Clipboard.getStringAsync();
    if (text === req) {
      setIsCopy(true);
    }
  };

  const onCloseModal = () => {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      return () => {
        setIsCopy(false);
      };
    }, [])
  );


  return (
    <Container>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'light'} />

      <QRCodeWrap>
        <QRCode value={req} />
        <QRPayReqText>{ellipsisSandwich(req, 10)}</QRPayReqText>
      </QRCodeWrap>
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
    </Container>
  );
}

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

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}); */
