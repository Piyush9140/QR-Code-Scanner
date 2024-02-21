import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCodeContext } from '../QRCodeContext'; 

const HomeScreen = ({ navigation }) => {
  const { history, loadHistory } = useContext(QRCodeContext); 
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('QRCodeHistory', { qrCode: item })}>
      <View style={styles.item}>
        <Text>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Scan QR Code" onPress={() => navigation.navigate('QRScanner')} />
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default HomeScreen;
