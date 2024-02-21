import React, { useContext, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet ,Text} from 'react-native';
import {QRCodeContext} from '../QRCodeContext'; 
const QRCodeHistoryScreen = () => {
  const { history, loadHistory, deleteQRCodeFromHistory } = useContext(QRCodeContext); 

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Text>{item.content}</Text>
      <Button title="Delete" onPress={() => deleteQRCodeFromHistory(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default QRCodeHistoryScreen;
