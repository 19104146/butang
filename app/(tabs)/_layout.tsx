import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C88426",
        tabBarInactiveTintColor: "#FFE9CB",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
        headerTintColor: "#FFE9CB",
        headerTitleStyle: {
          color: "#FFE9CB",
          fontSize: 32,
          fontWeight: "600",
        },
        headerTransparent: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={36} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <MaterialIcons name="inventory" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <MaterialIcons name="import-contacts" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="more-horiz" size={30} color={color} />,
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
