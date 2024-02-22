import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { QRCodeContext } from "../QRCodeContext";
import PrimaryButton from "../component/PrimaryButton";

const HomeScreen = ({ navigation }) => {
  const { history, loadHistory } = useContext(QRCodeContext);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={() => navigation.navigate("History", { qrCode: item })}
      >
        <View style={{ padding: 20 }}>
          <Text>
            {item.content.length > 20
              ? `${item.content.substring(0, 18)}... `
              : item.content}
          </Text>
          <Text
            style={{
              fontSize: 10,
              position: "absolute",
              bottom: 1,
              marginLeft: 20,
            }}
          >
            Click here for detailed view
          </Text>
        </View>
      </Pressable>
    </View>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container]}>
      <PrimaryButton onPress={() => navigation.navigate("QR Scanner")}>
        Scan QR Code
      </PrimaryButton>
      <Text
        style={{
          display: "flex",
          alignItems: "flex-start",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        History....
      </Text>
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
    justifyContent: "center",
    padding: 20,
  },
  item: {
    backgroundColor: "#fbd1fe",
    marginVertical: 8,
    borderRadius: 10,
    elevation: 4,
    overflow: "hidden",
  },
});

export default HomeScreen;
