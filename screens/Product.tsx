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

const PRODUCTS = [
  {
    description: 'La nueva era digital',
    img_url:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dondeir.com%2Fwp-content%2Fuploads%2F2021%2F04%2Fnfts.jpg&f=1&nofb=1',
    amount: '400',
  },
  {
    description: 'Attracts',
    img_url:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FD2ZP-iOX4AEbzRv.jpg&f=1&nofb=1',
    amount: '550',
  },
  {
    description: 'Valkryie',
    img_url:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2Ffcb16210761223.5eaa3b5017966.jpg&f=1&nofb=1',
    amount: '1,000',
  },
  {
    description: 'In Paradise',
    img_url:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.showmetech.com.br%2Fwp-content%2Fuploads%2F2021%2F03%2Fgrimes-nft-1614741018-1024x576.jpeg&f=1&nofb=1',
    amount: '2,000',
  },
];

export function ProductScreen({ navigation }) {
  const { createPaymentRequest } = useContext(LNContext);

  const handleShowModal = () => {
    navigation.navigate('Modal');
  };

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
          {PRODUCTS.map((value, index) => (
            <Product
              key={index}
              uri={value.img_url}
              description={value.description}
              amount={value.amount}
              onPress={handleShowModal}
            />
          ))}
        </ProductWrap>
      </ScrollView>
    </Container>
  );
}

const Product = ({ uri, amount, description, onPress }) => {
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
          <DescContentTitle>{description}</DescContentTitle>
        </DescContent>
        <DescContent>
          <DescContentLabel>Amount</DescContentLabel>
          <DescContentTitle>{amount} Sats</DescContentTitle>
        </DescContent>
      </DescWrap>
      <PurchaseButton onPress={onPress}>
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
