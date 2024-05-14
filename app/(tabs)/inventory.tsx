import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const dummyCategories = [
  {
    id: 1,
    name: "Medicine",
  },
  {
    id: 2,
    name: "Beverages",
  },
];

const dummyProducts = [
  {
    id: 1,
    url: null,
    name: "Biogesic",
    quantity: 69,
    categoryId: 1,
  },
  {
    id: 2,
    url: null,
    name: "Yakult",
    quantity: 420,
    category: 2,
  },
];

export default function InventoryScreen() {
  const headerHeight = useHeaderHeight();

  const [category, setCategory] = useState<string>("All");

  return (
    <View style={StyleSheet.compose(styles.container, { paddingTop: headerHeight + 20 })}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.category}>
          {category}
          <MaterialIcons name="arrow-drop-down" size={20} />
        </Text>
        {dummyProducts.map(({ id, url, name, quantity }) => (
          <View
            key={id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              {url ? (
                <Text>Hello</Text>
              ) : (
                <MaterialIcons
                  name="image"
                  size={50}
                  style={{ color: "#FFF", borderWidth: 1, borderRadius: 5, borderColor: "#FFF" }}
                />
              )}
              <Text style={{ color: "#FFF" }}>{name}</Text>
            </View>
            <Text style={{ color: "#FFF" }}>{quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    gap: 10,
  },
  category: {
    color: "#FFF",
    fontSize: 20,
  },
});
