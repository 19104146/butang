import { useEffect, useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { listProducts, Product } from "@/data-access/products";

export default function LowStocks() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await listProducts();

      setProducts(fetchedProducts);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredProducts = products.filter((product) => product.lowLimit && product.quantity <= product.lowLimit);

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.lowStockView}
    >
      <View style={styles.viewHeader}>
        <Text style={styles.headerText}>Low Stocks</Text>
      </View>
      <View style={styles.itemContainer}>
        {filteredProducts.length === 0 ? (
          <Text style={{ color: "grey" }}>No low stocks!</Text>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8 }}>
                <Text style={styles.contentText}>{item.name}</Text>
                <Text style={styles.contentText}>{item.quantity}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={true}
            overScrollMode="never"
            persistentScrollbar={true}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#FFE9CB",
    fontWeight: "bold",
  },
  contentText: {
    color: "#FFE9CB",
    fontSize: 16,
  },
  lowStockView: {
    backgroundColor: "transparent",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    height: "27.5%",
    justifyContent: "flex-start",
  },
  itemContainer: {
    flex: 1,
    paddingBottom: 10,
    // backgroundColor: 'red',
  },
  viewHeader: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    gap: 10,
  },
});
