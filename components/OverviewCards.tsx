import { useEffect, useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { Activity, listActivities } from "@/data-access/activities";
import { Category, listCategories } from "@/data-access/categories";
import { listProducts, Product } from "@/data-access/products";

export function ItemCard() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await listProducts();

      setItems(fetchedItems);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.lowStockView, { height: "60%", width: "100%" }]}
    >
      <View style={[styles.container, { gap: 10 }]}>
        <Text style={[styles.headerText, { fontSize: 32 }]}>{items.length}</Text>
        <Text style={{ color: "#8A8A8A" }}>Items</Text>
      </View>
    </LinearGradient>
  );
}

export function CategoryCard() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await listCategories();

      setCategories(fetchedItems);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.lowStockView, { height: "40%", width: "100%" }]}
    >
      <View style={[styles.container, { gap: 0, paddingHorizontal: 0 }]}>
        <Text style={[styles.headerText, { fontSize: 32 }]}>{categories.length}</Text>
        <Text style={{ color: "#8A8A8A" }}>Categories</Text>
      </View>
    </LinearGradient>
  );
}

export function RecentCard() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await listActivities();

      setActivities(fetchedItems);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.lowStockView, { height: "40%", width: "100%" }]}
    >
      <View style={[styles.container, { gap: 10 }]}>
        <Text style={[styles.headerText, { fontSize: 32 }]}>{activities.length}</Text>
        <Text style={{ color: "#8A8A8A" }}>Recents</Text>
      </View>
    </LinearGradient>
  );
}

export function SomethingCard() {
  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.lowStockView, { height: "60%", width: "100%" }]}
    >
      <View style={[styles.container, { gap: 10 }]}>
        <Text style={[styles.headerText, { fontSize: 32, color: "grey" }]}>WIP</Text>
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
  lowStockView: {
    backgroundColor: "transparent",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    height: "27.5%",
    justifyContent: "flex-start",
  },
});
