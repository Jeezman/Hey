import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { RootStackScreenProps } from '../types';

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const onLogin = () => {
    navigation.navigate('Product');
  };

  const onViewCollection = () => {
    navigation.navigate('MyCollection');
  };

  return (
    <Container>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <ButtonWrap>
          <Button onPress={onLogin}>
            <ButtonText>View catalogue</ButtonText>
          </Button>
          <Button onPress={onViewCollection}>
            <ButtonText>Your collections</ButtonText>
          </Button>
        </ButtonWrap>
      </ImageBackground>
    </Container>
  );
}

const ButtonWrap = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 55px;
`;

const Container = styled.View`
  background-color: #eed;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Button = styled.TouchableOpacity`
  height: 53px;
  width: 75%;
  margin-top: 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #eb562e;
  ${(props) => !props.disabled && `box-shadow: 0px 3px 0px rgba(0,0,0,0.2);`}
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`;

const styledText = styled.Text`
  color: red;
`;
