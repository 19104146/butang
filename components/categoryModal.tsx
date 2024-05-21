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
                  justifyContent: "flex-start",
                  width: "100%",
                  paddingHorizontal: 15,
                  paddingTop: 5,
                }}
              >
                <Text style={{ color: "#FFE9CB", fontSize: 36, fontWeight: "bold" }}>Add Category</Text>
              </View>
              <View style={{ width: "100%", alignItems: "center", flex: 1, justifyContent: "center" }}>
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
                  value={categories?.name}
                  onChangeText={(newText) => handleInputChange("name", newText)}
                />
              </View>
            </View>
            <View style={style.rowContainer}>
              <Pressable onPress={() => handleDelete(categories?.id)}>
                <MaterialIcons name="delete" size={35} color="#EC8A8D" />
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
  },
  modalView: {
    display: "flex",
    width: "90%",
    height: 200,
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
    height: "75%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "space-between",
    height: "25%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});
