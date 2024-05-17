import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "#FFE9CB",
        headerTitleStyle: {
          color: "#FFE9CB",
          fontSize: 32,
          fontWeight: "600",
        },
        headerTransparent: true,
        headerShown: true,
        animation:"none",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
         
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    marginRight: 15.5,
    gap: 20,
  },
});
