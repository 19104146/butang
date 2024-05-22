import { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { createActivity } from "@/data-access/activities";
import { Category, listCategories } from "@/data-access/categories";
import { deleteProduct, updateProduct, type NewProduct } from "@/data-access/products";

interface itemModalProps {
  isItemVisible: boolean;
  item: NewProduct | null;
  onClose: () => void;
}

const ItemModal = ({ isItemVisible, item, onClose }: itemModalProps): JSX.Element => {
  const [product, setProduct] = useState<NewProduct | null>(item);
  const [categories, setCategories] = useState<Category[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await listCategories();

      fetchedCategories.unshift({ id: "none", name: "All", createdAt: "", updatedAt: null });

      setCategories(fetchedCategories);
    };
    fetchData();

    setProduct(item);
  }, [item]);

  const handleInputChange = (field: keyof NewProduct, value: NewProduct[keyof NewProduct]) => {
    setProduct((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleDelete = async (productId?: string) => {
    if (productId) {
      await deleteProduct(productId);
      await createActivity({
        sender: "User",
        message: `Deleted "${item?.name}"`,
      });
      onClose();
    } else {
      console.error("Product ID is undefined. Cannot delete.");
    }
  };

  return (
    <Modal visible={isItemVisible} animationType="fade" transparent>
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
                }}
              >
                <Text style={{ color: "#FFE9CB", fontSize: 36, fontWeight: "bold" }}>{item?.name}</Text>
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
                  placeholderTextColor={"grey"}
                  value={product?.name}
                  onChangeText={(text) => handleInputChange("name", text)}
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
                    value={product?.quantity?.toString()}
                    onChangeText={(text) => handleInputChange("quantity", text)}
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
                    value={product?.lowLimit?.toString()}
                    onChangeText={(text) => handleInputChange("lowLimit", text)}
                  />
                </View>
                <Dropdown
                  data={categories ? categories : [{ id: "0", name: "No data", createdAt: "", updatedAt: "" }]}
                  labelField="name"
                  valueField="id"
                  onChange={(item) => handleInputChange("categoryId", item.id)}
                  value={item?.categoryId}
                  placeholder={item?.name}
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
                  iconColor="#FFE9CB"
                  itemContainerStyle={{ backgroundColor: "#161615", margin: 4, borderRadius: 16 }}
                  activeColor="#936525"
                  showsVerticalScrollIndicator
                  autoScroll
                  style={{
                    width: "90%",
                    paddingHorizontal: 25,
                    borderColor: "rgba(255, 255, 255, .3)",
                    borderWidth: 1,
                    marginHorizontal: 60,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View style={styles.rowContainer}>
                <Pressable onPress={() => handleDelete(item?.id)}>
                  <MaterialIcons name="delete" size={40} color="#FFE9CB" />
                </Pressable>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Pressable
                    onPress={onClose}
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
                      if (product && item?.id) {
                        const updatedProduct = {
                          ...product,
                          id: item.id,
                        };

                        try {
                          await updateProduct(updatedProduct);
                          await createActivity({
                            sender: "User",
                            message: `Updated "${item?.name}"`,
                          });
                        } catch (error) {
                          console.error("Error updating product:", error);
                        }
                        onClose();
                      }
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    justifyContent: "space-between",
    height: "15%",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  dropDownText: {
    color: "#FFE9CB",
    fontSize: 20,
    fontWeight: 500,
  },
  formView: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
