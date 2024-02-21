// QRCodeContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const QRCodeContext = createContext();
export const QRCodeProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const jsonHistory = await AsyncStorage.getItem('@qrCodeHistory');
      if (jsonHistory) {
        setHistory(JSON.parse(jsonHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const addQRCodeToHistory = async (data) => {
    try {
      const newQRCode = { id: Date.now(), content: data };
      const updatedHistory = [...history, newQRCode];
      await AsyncStorage.setItem('@qrCodeHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error adding QR code to history:', error);
    }
  };

  const deleteQRCodeFromHistory = async (id) => {
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      await AsyncStorage.setItem('@qrCodeHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting QR code from history:', error);
    }
  };

  return (
    <QRCodeContext.Provider value={{ history, loadHistory, addQRCodeToHistory, deleteQRCodeFromHistory }}>
      {children}
    </QRCodeContext.Provider>
  );
};
