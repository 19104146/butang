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
  const [modalCategories, setModalCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await listCategories();
      const fetchedModalCategories = await listCategories();

      setModalCategories(fetchedModalCategories);

      if (fetchedCategories.length > 0) {
        fetchedCategories.unshift({ id: "none", name: "All", createdAt: "", updatedAt: null });
      }

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
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFE9CB", fontSize: 30, fontWeight: "bold" }}>{item?.name}</Text>
                <Pressable onPress={() => handleDelete(item?.id)}>
                  <MaterialIcons name="delete" size={30} color="#EC8A8D" />
                </Pressable>
              </View>
              {/* <MaterialIcons name="image" size={150} color="#FFE9CB" /> */}
              <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <TextInput
                  style={[styles.inputText, { width: "100%" }]}
                  placeholder="Name"
                  placeholderTextColor={"grey"}
                  value={product?.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Quantity"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={product?.quantity?.toString()}
                    onChangeText={(text) => handleInputChange("quantity", text)}
                  />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Low Limit"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={product?.lowLimit?.toString()}
                    onChangeText={(text) => handleInputChange("lowLimit", text)}
                  />
                </View>
                <Dropdown
                  data={modalCategories}
                  labelField="name"
                  valueField="id"
                  onChange={(item) => handleInputChange("categoryId", item.id)}
                  value={item?.categoryId}
                  placeholder={item?.name}
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
              </View>
              <View style={styles.rowContainer}>
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
                    backgroundColor: "#1cdf93",
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
  dropDownText: {
    color: "#FFE9CB",
    fontSize: 20,
    fontWeight: 500,
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
  formView: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
