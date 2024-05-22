import { useEffect, useMemo, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
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
import { Category, listCategories } from "@/data-access/categories";
import { createProduct, listProducts, NewProduct, Product } from "@/data-access/products";

export default function InventoryScreen() {
  const headerHeight = useHeaderHeight();

  const [category, setCategory] = useState<string>("none");
  const [categories, setCategories] = useState<Category[] | null>();
  const [modalCategories, setModalCategories] = useState<Category[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isItemVisible, setIsItemVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [product, setProduct] = useState<NewProduct>({ categoryId: "", name: "", quantity: 0 });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await listProducts();
      const fetchedCategories = await listCategories();
      const fetchedModalCategories = await listCategories();

      setModalCategories(fetchedModalCategories);

      if (fetchedCategories.length > 0) {
        fetchedCategories.unshift({ id: "none", name: "All", createdAt: "", updatedAt: null });
      }

      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    };

    fetchData();
  }, [isVisible, isItemVisible]);

  const filteredProducts = useMemo(() => {
    if (category === "none") {
      return products;
    }

    return products.filter((product) => product.categoryId === category);
  }, [category, products]);

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
                <Text style={{ color: "#FFE9CB", fontSize: 30, fontWeight: "bold", alignSelf: "center" }}>
                  Add Item
                </Text>
                <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                  <TextInput
                    style={[styles.inputText, { width: "100%" }]}
                    placeholder="Name"
                    placeholderTextColor="grey"
                    onChangeText={(newText) => handleInputChange("name", newText)}
                    autoComplete="off"
                  />
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Quantity"
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      onChangeText={(newText) => handleInputChange("quantity", newText)}
                    />
                    <TextInput
                      style={styles.inputText}
                      placeholder="Low Limit"
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      onChangeText={(newText) => handleInputChange("lowLimit", newText)}
                    />
                  </View>
                  {modalCategories.length > 0 ? (
                    <Dropdown
                      data={modalCategories}
                      labelField="name"
                      valueField="id"
                      onChange={(item) => handleInputChange("categoryId", item.id)}
                      value={null}
                      placeholder="Category"
                      placeholderStyle={[
                        styles.dropDownText,
                        {
                          fontWeight: "200",
                          color: "rgba(255, 255, 255, .3)",
                        },
                      ]}
                      selectedTextStyle={[
                        styles.dropDownText,
                        {
                          fontWeight: "200",
                          color: "white",
                        },
                      ]}
                      itemTextStyle={[styles.dropDownText, { fontSize: 16, borderRadius: 16 }]}
                      containerStyle={{
                        borderColor: "#161615",
                        padding: 4,
                        borderRadius: 20,
                        backgroundColor: "#111111",
                        borderWidth: 1,
                      }}
                      iconColor="#FFE9CB"
                      itemContainerStyle={{ backgroundColor: "#161615", margin: 4, borderRadius: 16 }}
                      activeColor="#936525"
                      showsVerticalScrollIndicator
                      autoScroll
                      style={{
                        height: 42,
                        width: "100%",
                        paddingHorizontal: 10,
                        borderColor: "rgba(255, 255, 255, .3)",
                        borderWidth: 1,
                        marginHorizontal: 60,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        textAlign: "center",
                        color: "#EC8A8D",
                      }}
                    >
                      Go to (
                      <MaterialIcons name="more-horiz" size={20} color="#C88426" />) then Categories to add a category
                    </Text>
                  )}
                </View>
                <View style={styles.rowContainer}>
                  <Pressable
                    onPress={toggleModal}
                    style={{
                      borderRadius: 20,
                      borderWidth: 2,
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
                      backgroundColor: "#1cdf93",
                      width: 95,
                      height: 35,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={async () => {
                      console.log(product);
                      if (product.categoryId !== "" && product.name !== "") {
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
          data={categories ? categories : [{ id: "0", name: "No data", createdAt: "", updatedAt: "" }]}
          labelField="name"
          valueField="id"
          onChange={(item) => setCategory(item.id)}
          value={category}
          placeholder="All"
          placeholderStyle={[styles.dropDownText]}
          selectedTextStyle={[styles.dropDownText, { fontSize: 24 }]}
          itemTextStyle={[styles.dropDownText, { fontSize: 16, borderRadius: 16 }]}
          containerStyle={{
            borderColor: "#161615",
            padding: 4,
            borderRadius: 20,
            backgroundColor: "#111111",
            borderWidth: 1,
          }}
          iconColor="#FFE9CB"
          itemContainerStyle={{ backgroundColor: "#161615", margin: 4, borderRadius: 16 }}
          activeColor="#936525"
          showsVerticalScrollIndicator
          autoScroll
          style={{ marginBottom: 20 }}
        />
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <Pressable
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}
              onPress={() => toggleItemModal(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                {/* {item.imageUrl ? (
                  <Image source={item.imageUrl} style={styles.image} />
                ) : (
                  <MaterialIcons name="photo" size={50} color="#FFE9CB" style={styles.image} />
                )} */}
                <Text style={[styles.dropDownText, { fontSize: 18 }]}>{item.name}</Text>
              </View>
              <Text style={[styles.dropDownText, { fontSize: 18 }]}>{item.quantity}</Text>
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
  inputText: {
    fontSize: 20,
    height: 42,
    width: "48%",
    borderColor: "rgba(255, 255, 255, .3)",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: "200",
    color: "white",
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    width: "100%",
  },
  dropDownText: {
    color: "#FFE9CB",
    fontSize: 20,
    fontWeight: "500",
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
    padding: 20,
  },
  modalView: {
    borderColor: "#34240D",
    borderWidth: 2,
    display: "flex",
    width: "100%",
    height: 290,
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
    height: "22%",
    gap: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  formView: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
