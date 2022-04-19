import styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  View,
  Image,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { LNContext } from '../context/LNContext';
import { PhotoIcon, PadlockIcon } from '../assets/images/icons';

export function ProductScreen({}) {
  const { createPaymentRequest } = useContext(LNContext);

  return (
    <Container>
        <Text
          style={{
            marginTop: 26,
            marginBottom: 20,
            color: '#2E3B4E',
            fontSize: 24,
            opacity: 0.9,
          }}
        >
          Art Collections
        </Text>
      <ScrollView>
        

        <ProductWrap>
          <Product />
          <Product />
          <Product />
          <Product />
        </ProductWrap>
      </ScrollView>
    </Container>
  );
}

const Product = () => {
  let uri =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dondeir.com%2Fwp-content%2Fuploads%2F2021%2F04%2Fnfts.jpg&f=1&nofb=1';
  return (
      <ProductCard>
          <ProductCardMask>
              <PadlockIcon color="#ddd" />
          </ProductCardMask>
      <Image
        source={{
          uri: uri,
        }}
        style={{ width: '100%', height: 200 }}
      />
      <DescWrap>
        <DescContent>
          <DescContentLabel>Desc.</DescContentLabel>
          <DescContentTitle>La nueva era digital</DescContentTitle>
        </DescContent>
        <DescContent>
          <DescContentLabel>Amount</DescContentLabel>
          <DescContentTitle>4,000 Sats</DescContentTitle>
        </DescContent>
      </DescWrap>
      <PurchaseButton>
        {/* <PhotoIcon /> */}
        <PurchaseButtonText>CLAIM</PurchaseButtonText>
      </PurchaseButton>
    </ProductCard>
  );
};

const DescWrap = styled.View`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px 10px 0 10px;
`;

const DescContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const DescContentLabel = styled.Text`
  color: #bbbbbb;
  font-size: 14px;
`;

const DescContentTitle = styled.Text`
  color: #000000;
  font-size: 14px;
`;

const ProductCard = styled.View`
  border: 1px solid #dedede;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding: 5px;
  width: 49%;
  margin-bottom: 15px;
`;

const ProductCardMask = styled.View`
  background: #aaa;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  width: 104%;
  height: 205px;
  opacity: 0.85;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

const PurchaseButton = styled.TouchableOpacity`
  height: 46px;
  width: 100%;
  background: #fff;
  border: 1px solid #dedede;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const PurchaseButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
`;

const Container = styled.View`
  padding-top: 25px;
  background-color: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProductWrap = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
`;

const Button = styled.TouchableOpacity`
  height: 53px;
  width: 70%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  border: 1px solid #000;
  ${(props) => !props.disabled && `box-shadow: 0px 3px 0px rgba(0,0,0,0.2);`}
`;

const ButtonText = styled.Text`
  color: #000;
  font-size: 14px;
`;

const styledText = styled.Text`
  color: red;
`;
