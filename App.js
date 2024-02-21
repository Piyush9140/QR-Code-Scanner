import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import QRCodeHistoryScreen from './screens/QRCodeHistoryScreen';
import { QRCodeProvider } from './QRCodeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <QRCodeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QRScanner" component={QRScannerScreen} />
          <Stack.Screen name="QRCodeHistory" component={QRCodeHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QRCodeProvider>
  );
}
