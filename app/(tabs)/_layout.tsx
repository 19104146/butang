import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C88426",
        tabBarInactiveTintColor: "#E8EAED",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
        headerTintColor: "#F4F1EC",
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: 600,
          color: '#FFE9CB'
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
          headerRight: ({ tintColor }) => (
            <View style={styles.headerRightContainer}>
              <MaterialIcons name="search" size={24} color={tintColor} />
              <MaterialIcons name="filter-list" size={24} color={tintColor} />
              <MaterialIcons name="add-box" size={24} color={tintColor} />
            </View>
          ),
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
        name="more/index"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <MaterialIcons name="more-horiz" size={30} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    marginRight: 15.5,
    gap: 20,
  },
});
