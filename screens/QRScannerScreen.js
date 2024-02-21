import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { QRCodeContext } from '../QRCodeContext'; // Import the QRCodeContext

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { addQRCodeToHistory } = useContext(QRCodeContext); // Use the QRCodeContext

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      // Add the scanned QR code to history using the context function
      await addQRCodeToHistory(data);
      // Navigate to the QRCodeHistory screen
      navigation.navigate('QRCodeHistory', { scannedData: data });
    } catch (error) {
      console.error('Error saving QR code to history:', error);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
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
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          {scanned && <Button title="Scan Again" onPress={handleScanAgain} />}
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
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlayText: {
    fontSize: 24,
    color: 'white',
  },
});

export default QRScannerScreen;
