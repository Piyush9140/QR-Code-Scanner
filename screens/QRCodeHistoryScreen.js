import React, { useContext, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { QRCodeContext } from "../QRCodeContext";
import PrimaryButton from "../component/PrimaryButton";
const QRCodeHistoryScreen = () => {
  const { history, loadHistory, deleteQRCodeFromHistory } =
    useContext(QRCodeContext);

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.content}</Text>
      <PrimaryButton onPress={() => deleteQRCodeFromHistory(item.id)}>
        Delete
      </PrimaryButton>
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
    backgroundColor: "#fbd1fe",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    elevation: 5,
  },
});

export default QRCodeHistoryScreen;
