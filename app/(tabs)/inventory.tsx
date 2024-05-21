import { useContext, useEffect, useMemo, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import ItemModal from "@/components/ItemModal";
import { createActivity } from "@/data-access/activities";
import { createProduct, listProducts, NewProduct, Product } from "@/data-access/products";

import { CategoriesContext } from "./_layout";

export default function InventoryScreen() {
  const headerHeight = useHeaderHeight();

  const [category, setCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isItemVisible, setIsItemVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [product, setProduct] = useState<NewProduct | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await listProducts();
      setProducts(fetchedProducts);
    };

    fetchData();
  }, [isVisible, isItemVisible]);

  const filteredProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter((product) => product.categoryId === category);
  }, [category, products]);

  const dummyCategoriesContext = useContext(CategoriesContext);
  const dummyCategories = [{ id: null, name: "All", createdAt: "", updatedAt: "" }, ...dummyCategoriesContext!];

  const toggleModal = () => setIsVisible((prev) => !prev);
  const toggleItemModal = (item: Product | null) => {
    setSelectedItem(item);
    setIsItemVisible((prev) => !prev);
  };

  const handleInputChange = (field: keyof NewProduct, value: NewProduct[keyof NewProduct]) => {
    setProduct((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={StyleSheet.compose(styles.container, { paddingTop: headerHeight + 20 })}>
      <Tabs.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <View style={styles.headerRightContainer}>
              <MaterialIcons name="search" size={24} color={tintColor} />
              <MaterialIcons name="filter-list" size={24} color={tintColor} />
              <MaterialIcons name="add-box" size={24} color={tintColor} onPress={toggleModal} />
            </View>
          ),
        }}
      />
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <Modal visible={isVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView behavior="height" style={styles.modalView} keyboardVerticalOffset={20}>
            <LinearGradient
              dither={false}
              colors={["#765931", "#100D09"]}
              locations={[0, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.compose(StyleSheet.absoluteFill, { borderRadius: 20 })}
            >
              <View style={styles.formView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "100%",
                    paddingHorizontal: 15,
                    paddingTop: 5,
                    height: 45,
                  }}
                >
                  <Text style={{ color: "#FFE9CB", fontSize: 36, fontWeight: "bold" }}>Add Item</Text>
                </View>
                <MaterialIcons name="image" size={150} color="#FFE9CB" />
                <View style={{ width: "100%", alignItems: "center" }}>
                  <TextInput
                    style={{
                      fontSize: 20,
                      height: 40,
                      width: "90%",
                      borderColor: "rgba(255, 255, 255, .3)",
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 10,
                      fontWeight: "200",
                      paddingLeft: 10,
                      color: "white",
                    }}
                    placeholder="Name"
                    placeholderTextColor="grey"
                    onChangeText={(newText) => handleInputChange("name", newText)}
                  />
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 15 }}>
                    <TextInput
                      style={{
                        fontSize: 20,
                        height: 40,
                        width: "43%",
                        borderColor: "rgba(255, 255, 255, .3)",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        fontWeight: "200",
                        paddingLeft: 10,
                        color: "white",
                      }}
                      placeholder="Quantity"
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      onChangeText={(newText) => handleInputChange("quantity", newText)}
                    />
                    <TextInput
                      style={{
                        fontSize: 20,
                        height: 40,
                        width: "43%",
                        borderColor: "rgba(255, 255, 255, .3)",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        fontWeight: "200",
                        paddingLeft: 10,
                        color: "white",
                      }}
                      placeholder="Low Limit"
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      onChangeText={(newText) => handleInputChange("lowLimit", newText)}
                    />
                  </View>
                  <TextInput
                    style={{
                      fontSize: 20,
                      height: 40,
                      width: "90%",
                      borderColor: "rgba(255, 255, 255, .3)",
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 10,
                      fontWeight: "200",
                      paddingLeft: 10,
                      alignItems: "flex-end",
                      color: "white",
                    }}
                    placeholder="Category"
                    placeholderTextColor={"grey"}
                    onChangeText={() => handleInputChange("categoryId", "1")}
                  >
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFE9CB" />
                  </TextInput>
                </View>
                <View style={styles.rowContainer}>
                  <Pressable
                    onPress={toggleModal}
                    style={{
                      borderWidth: 2,
                      borderRadius: 20,
                      borderColor: "#EC8A8D",
                      width: 77,
                      height: 35,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#EC8A8D", fontSize: 18, fontWeight: "600" }}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderRadius: 20,
                      backgroundColor: "#22A969",
                      width: 95,
                      height: 35,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={async () => {
                      if (product) {
                        try {
                          await createProduct(product);
                          await createActivity({
                            sender: "User",
                            message: `Added ${product.quantity} "${product.name}"`,
                          });
                        } catch (error: any) {
                          console.error(error);
                        }

                        toggleModal();
                      }
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View style={styles.innerContainer}>
        <Dropdown
          data={dummyCategories ? dummyCategories : [{ id: "0", name: "No data", createdAt: "", updatedAt: "" }]}
          labelField="name"
          valueField="id"
          searchField="name"
          onChange={(item) => setCategory(item.id)}
          value={category}
          placeholder="All"
          placeholderStyle={[styles.dropDownText]}
          selectedTextStyle={styles.dropDownText}
          itemTextStyle={[styles.dropDownText, { fontSize: 16, borderRadius: 16 }]}
          containerStyle={{
            borderColor: "#161615",
            padding: 4,
            borderRadius: 20,
            backgroundColor: "#111111",
            borderWidth: 1,
          }}
          inputSearchStyle={{ borderRadius: 20, borderColor: "#585147", color: "#FFE9CB", backgroundColor: "#111111" }}
          iconColor="#FFE9CB"
          itemContainerStyle={{ backgroundColor: "#161615", margin: 4, borderRadius: 16 }}
          activeColor="#936525"
          search={true}
          searchPlaceholder="Search..."
          showsVerticalScrollIndicator
          autoScroll
        />
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <Pressable
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
              onPress={() => toggleItemModal(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                {item.imageUrl ? (
                  <Image source={item.imageUrl} style={styles.image} />
                ) : (
                  <MaterialIcons name="photo" size={50} color="#FFE9CB" style={styles.image} />
                )}
                <Text style={{ color: "#FFE9CB" }}>{item.name}</Text>
              </View>
              <Text style={{ color: "#FFE9CB" }}>{item.quantity}</Text>
            </Pressable>
          )}
        />
      </View>
      <ItemModal isItemVisible={isItemVisible} onClose={() => setIsItemVisible(false)} item={selectedItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    width: "100%",
  },
  dropDownText: {
    color: "#FFE9CB",
    fontSize: 20,
    fontWeight: 500,
  },
  image: {
    borderColor: "#FFE9CB",
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  headerRightContainer: {
    flexDirection: "row",
    marginRight: 15.5,
    gap: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    display: "flex",
    width: "90%",
    height: 420,
    backgroundColor: "#201E1B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 25,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "flex-end",
    height: "15%",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  formView: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
