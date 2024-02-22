import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { QRCodeContext } from "../QRCodeContext";

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { addQRCodeToHistory } = useContext(QRCodeContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const QRscan = async (data) => {
    try {
      await addQRCodeToHistory(data);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving QR code to history:", error);
    }
  };
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR Scanned", "Do you want to save data", [
      {
        text: "NO",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
      { text: "YES", onPress: () => QRscan(data) },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scan QR Code</Text>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  overlayText: {
    fontSize: 24,
    color: "white",
  },
});

export default QRScannerScreen;
