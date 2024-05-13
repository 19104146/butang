import {  Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTintColor: "#F4F1EC",
        headerTitleStyle: {
          fontSize: 32,
          marginLeft:10,
        },
        headerTransparent: true,
        tabBarActiveTintColor: "#C88426",
        tabBarInactiveTintColor: "#E8EAED",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <MaterialIcons name="inventory" size={24} color={color} />,
          headerRight: ({ tintColor }) => (
            <View style={styles.headerRightContainer}>
              <MaterialIcons name="search" size={24} color={tintColor} />
              <MaterialIcons name="filter-list" size={24} color={tintColor} style={{ marginHorizontal: 15 }}/>
              <MaterialIcons name="add-box" size={24} color={tintColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <MaterialIcons name="import-contacts" size={24} color={color} />,
          headerRight: ({ tintColor }) => (
            <View style={styles.headerRightContainer}>
              <MaterialIcons name="calendar-today" size={24} color={tintColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more/index"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <MaterialIcons name="more-horiz" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row', 
    marginHorizontal: 10,
  },
});