import styled from 'styled-components/native';
import { Text, ScrollView, Image } from 'react-native';
import {  useContext } from 'react';
import { LNContext } from '../context/LNContext';
import { PadlockIcon } from '../assets/images/icons';
import { commaify } from '../utils/formatters';
import { RootStackScreenProps } from '../types';

export function ProductScreen({ navigation }: RootStackScreenProps<'Product'>) {
  const {
    collections,
    handleGetCollections,
    handleAddInvoiceToCollection,
  } = useContext(LNContext);

  const handleShowModal = (collection) => {
    navigation.navigate('Modal');
    handleAddInvoiceToCollection(collection);
  };

  const displayCollections = () => {
    if (collections.length <= 0) {
      return <Text>No collections to display</Text>;
    }

    return (
      <ProductWrap>
        {collections.map((collection, index) => (
          <Product
            key={collection.collection_id}
            uri={collection.img_url}
            description={collection.description}
            amount={collection.amount}
            settled={collection.invoice_settled}
            onPress={() => handleShowModal(collection)}
          />
        ))}
      </ProductWrap>
    );
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
      <ScrollView>{displayCollections()}</ScrollView>
    </Container>
  );
}

const Product = ({ uri, amount, description, onPress, settled }) => {
  return (
    <ProductCard>
      {settled ? null : (
        <ProductCardMask>
          <PadlockIcon color="#ddd" />
        </ProductCardMask>
      )}
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
          <DescContentTitle>{commaify(amount)} Sats</DescContentTitle>
        </DescContent>
      </DescWrap>
      {settled ? null : (
        <PurchaseButton onPress={onPress}>
          <PurchaseButtonText>CLAIM</PurchaseButtonText>
        </PurchaseButton>
      )}
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
