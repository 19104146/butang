import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const dummyCategories = [
  { label: "All", value: null },
  { label: "Medicine", value: "1" },
  { label: "Beverage", value: "2" },
];

const dummyProducts = [
  {
    id: 1,
    categoryId: "1",
    url: null,
    name: "Biogesic",
    quantity: 69,
  },
  {
    id: 2,
    categoryId: "2",
    url: null,
    name: "Yakult",
    quantity: 420,
  },
  {
    id: 3,
    categoryId: "2",
    url: null,
    name: "Dr. Pepper",
    quantity: 420,
  },
  {
    id: 4,
    categoryId: "2",
    url: null,
    name: "Red Bull",
    quantity: 420,
  },
  {
    id: 5,
    categoryId: "2",
    url: null,
    name: "Monster",
    quantity: 420,
  },
];

export default function InventoryScreen() {
  const headerHeight = useHeaderHeight();

  const [category, setCategory] = useState<string | null>(null);
  const filteredProducts = useMemo(() => {
    if (!category) return dummyProducts;

    return dummyProducts.filter((product) => product.categoryId === category);
  }, [category]);

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
        <Dropdown
          data={dummyCategories}
          labelField="label"
          valueField="value"
          onChange={(item) => setCategory(item.value)}
          value={category}
          placeholder="All"
          placeholderStyle={{ color: "#FFE9CB", fontSize: 20, fontWeight: 600 }}
          selectedTextStyle={{ color: "#FFE9CB", fontSize: 20, fontWeight: 600 }}
          containerStyle={{ borderColor: "#201E1B" }}
          iconColor="#FFE9CB"
          itemContainerStyle={{ backgroundColor: "#201E1B" }}
          itemTextStyle={{ color: "#FFE9CB" }}
          activeColor="#000"
          showsVerticalScrollIndicator
          autoScroll
        />
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                {item.url ? (
                  <Image
                    source={item.url}
                    style={{ borderColor: "#FFE9CB", borderWidth: 1, borderRadius: 5, padding: 5 }}
                  />
                ) : (
                  <MaterialIcons
                    name="photo"
                    size={50}
                    color="#FFE9CB"
                    style={{ borderColor: "#FFE9CB", borderWidth: 1, borderRadius: 5, padding: 5 }}
                  />
                )}
                <Text style={{ color: "#FFE9CB" }}>{item.name}</Text>
              </View>
              <Text style={{ color: "#FFE9CB" }}>{item.quantity}</Text>
            </View>
          )}
        />
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
});
