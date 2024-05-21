import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Product } from "@/data-access/products";

interface itemModalProps {
  isItemVisible: boolean;
  item: Product | null;
  onClose: () => void;
}

const ItemModal = ({ isItemVisible, item, onClose }: itemModalProps): JSX.Element => {
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
              <View style={{ width: "100%", height: 200, alignItems: "center" }}>
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
                  value={item?.name}
                />
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
                  }}
                  placeholder="Description"
                  placeholderTextColor={"grey"}
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
                    }}
                    placeholder="Quantity"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={item?.quantity.toString()}
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
                    }}
                    placeholder="Low Limit"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
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
                  }}
                  placeholder="Category"
                  placeholderTextColor={"grey"}
                >
                  <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFE9CB" />
                </TextInput>
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
                    backgroundColor: "#22A969",
                    width: 95,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
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
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    display: "flex",
    width: "90%",
    height: 470,
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
    height: 50,
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  formView: {
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});