import { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import CategoryModal from "@/components/categoryModal";
import { createCategory, listCategories, NewCategory } from "@/data-access/categories";

export default function Categories() {
  const headerHeight = useHeaderHeight();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<NewCategory>();
  const [categories, setCategories] = useState<NewCategory[]>();
  const [selectedCategory, setSelectedCategory] = useState<NewCategory | null>();
  const [isCategoryVisible, setIsCategoryVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [isVisible, isCategoryVisible]);

  const toggleModal = () => setIsVisible((prev) => !prev);

  const toggleCategoryModal = (category: NewCategory | null) => {
    setSelectedCategory(category);
    setIsCategoryVisible((prev) => !prev);
  };

  const handleInputChange = (key: string, value: string) => {
    setNewCategory((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={[style.container, { paddingTop: headerHeight }]}>
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <View style={style.headerRightContainer}>
              <MaterialIcons name="search" size={24} color={tintColor} />
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
      {categories?.map((category, index) => (
        <Pressable onPress={() => toggleCategoryModal(category)} key={index}>
          <View
            key={category.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              margin: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderColor: "#D0D0D020",
              borderWidth: 1,
              borderRadius: 15,
            }}
          >
            <LinearGradient
              dither={false}
              colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
              locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={StyleSheet.compose(StyleSheet.absoluteFill, { borderRadius: 15 })}
            />
            <Text style={style.text}>{category.name}</Text>
            {/* <View style={{ backgroundColor: "#6A655F", paddingHorizontal: 10, alignSelf: "center", borderRadius: 10 }}>
              <Text style={{ fontSize: 14, color: "#FFE9CB" }}>{category.value}</Text>
            </View> */}
          </View>
        </Pressable>
      ))}
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
                    onChangeText={(newText) => handleInputChange("name", newText)}
                  />
                </View>
              </View>
              <View style={style.rowContainer}>
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
                    if (newCategory) {
                      try {
                        await createCategory(newCategory.name);
                      } catch (error) {
                        console.error(error);
                      }
                    }
                    toggleModal();
                  }}
                >
                  <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>Confirm</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <CategoryModal
        category={selectedCategory!}
        onClose={() => toggleCategoryModal(null)}
        isVisible={isCategoryVisible!}
      />
    </View>
  );
}

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
    justifyContent: "flex-end",
    height: "25%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});
