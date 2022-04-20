import styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { OnboardContext } from '../../context/OnboardContext';
import { QRCodeInfo } from '../../components/QRCodeInfo';
import { LNContext } from '../../context/LNContext';

export function LoginScreen({navigation}) {
  
  const {handleLogin, address} = useContext(OnboardContext)
  const {createPaymentRequest} = useContext(LNContext)

  const onLogin = () => {
    navigation.navigate('Product')

    // createPaymentRequest()
  }

  return (
    <Container>
      <Text
        style={{
          marginTop: 26,
          marginBottom: 20,
          color: '#2E3B4E',
          fontSize: 14,
          opacity: 0.9,
        }}
      >
        Login with Lightning
      </Text>

      {/* <Button onPress={handleLogin}>
        <ButtonText>Login with Lightning</ButtonText>
      </Button> */}
      <Button onPress={onLogin}>
        <ButtonText>Login with Lightning</ButtonText>
      </Button>

      <Text>{address}</Text>

      <QRCodeInfo />
    </Container>
  );
}

const Container = styled.View`
  background-color: #eed;
  flex: 1;
  justify-content: center;
  align-items: center;
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
