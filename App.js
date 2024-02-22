import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import QRScannerScreen from "./screens/QRScannerScreen";
import QRCodeHistoryScreen from "./screens/QRCodeHistoryScreen";
import { QRCodeProvider } from "./QRCodeContext";
import { StatusBar } from "expo-status-bar";
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <QRCodeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: "#4d95a2" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="QR Scanner" component={QRScannerScreen} />
            <Stack.Screen name="History" component={QRCodeHistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QRCodeProvider>
    </>
  );
}
