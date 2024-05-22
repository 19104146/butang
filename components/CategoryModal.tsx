import { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { createActivity } from "@/data-access/activities";
import { deleteCategory, NewCategory, updateCategory } from "@/data-access/categories";

interface categoryModalProps {
  isVisible: boolean;
  category: NewCategory | null;
  onClose: () => void;
}

const CategoryModal = ({ isVisible, category, onClose }: categoryModalProps): JSX.Element => {
  const [categories, setCategories] = useState<NewCategory | null>(category);

  useEffect(() => {
    setCategories(category);
  }, [category]);

  const handleInputChange = (field: keyof NewCategory, value: NewCategory[keyof NewCategory]) => {
    setCategories((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleDelete = async (categoryId?: string) => {
    if (categoryId) {
      await deleteCategory(categoryId);
      await createActivity({
        sender: "User",
        message: `Deleted "${category?.name}"`,
      });
      onClose();
    } else {
      console.error("Category ID is undefined. Cannot delete.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={style.modalContainer}>
        <KeyboardAvoidingView behavior="height" style={style.modalView} keyboardVerticalOffset={20}>
          <LinearGradient
            dither={false}
            colors={["#765931", "#100D09"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.compose(StyleSheet.absoluteFill, { borderRadius: 20 })}
          >
            <View style={style.formView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFE9CB", fontSize: 30, fontWeight: "bold" }}>Change Category</Text>
                <Pressable onPress={() => handleDelete(categories?.id)}>
                  <MaterialIcons name="delete" size={30} color="#EC8A8D" />
                </Pressable>
              </View>
              <View style={{ width: "100%", alignItems: "center", marginVertical: 10, justifyContent: "center" }}>
                <TextInput
                  style={{
                    fontSize: 20,
                    height: 40,
                    width: "100%",
                    borderColor: "rgba(255, 255, 255, .3)",
                    borderWidth: 1,
                    borderRadius: 10,
                    fontWeight: "200",
                    paddingLeft: 10,
                    color: "white",
                  }}
                  placeholder="Name"
                  placeholderTextColor="grey"
                  value={categories?.name}
                  onChangeText={(newText) => handleInputChange("name", newText)}
                />
              </View>
              <View style={style.rowContainer}>
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
                    if (categories && categories.id && category) {
                      try {
                        await updateCategory(categories.id, categories.name);
                        await createActivity({
                          sender: "User",
                          message: `Updated "${category.name}" to "${categories.name}"`,
                        });
                      } catch (error) {
                        console.error(error);
                      }
                    }
                    onClose();
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

export default CategoryModal;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFE9CB",
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
    height: 190,
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
  formView: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "flex-end",
    height: "32%",
    alignItems: "flex-end",
  },
});
