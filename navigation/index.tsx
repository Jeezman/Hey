import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { LoginScreen } from '../screens/Login';
import ModalScreen from '../screens/ModalScreen';
import { MyCollectionScreen } from '../screens/MyCollection';
import { ProductScreen } from '../screens/Product';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='Product' component={ProductScreen} options={{headerShown: false}} />
      <Stack.Screen name='MyCollection' component={MyCollectionScreen} options={{headerShown: false}} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: "Collection", headerTintColor: "#000", headerStyle: {backgroundColor: '#eee'}}} />
      </Stack.Group>
    </Stack.Navigator>
  );
}