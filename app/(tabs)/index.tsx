import { MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import LowStocks from "@/components/LowStocks";
import RecentActivity from "@/components/RecentActivity";

export default function OverviewScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={StyleSheet.compose(styles.container, { paddingTop: headerHeight + 5, paddingBottom: tabBarHeight + 25 })}
    >
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <LowStocks />
      <RecentActivity />
      <View style={{ flexDirection: "row", flexWrap: "wrap", height: "auto", flex: 1, gap: 20 }}>
        <View style={{ flex: 1, gap: 15 }}>
          <LinearGradient
            dither={false}
            colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
            locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.lowStockView, { height: "60%", width: "100%" }]}
          >
            <View style={[styles.container, { gap: 10 }]}>
              <Text style={[styles.headerText, { fontSize: 32 }]}>529</Text>
              <Text style={{ color: "#8A8A8A" }}>Items</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            dither={false}
            colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
            locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.lowStockView, { height: "40%", width: "100%" }]}
          >
            <View style={[styles.container, { gap: 0, paddingHorizontal: 0 }]}>
              <Text style={[styles.headerText, { fontSize: 32 }]}>100</Text>
              <Text style={{ color: "#8A8A8A" }}>Categories</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{ flex: 1, gap: 15 }}>
          <LinearGradient
            dither={false}
            colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
            locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.lowStockView, { height: "40%", width: "100%" }]}
          >
            <View style={[styles.container, { gap: 10 }]}>
              <Text style={[styles.headerText, { fontSize: 32 }]}>420</Text>
              <Text style={{ color: "#8A8A8A" }}>Recents</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            dither={false}
            colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
            locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.lowStockView, { height: "60%", width: "100%" }]}
          >
            <View style={[styles.container, { gap: 10 }]}>
              <Text style={[styles.headerText, { fontSize: 32 }]}>9</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#8A8A8A", alignSelf: "flex-start" }}>Medicine</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#8A8A8A" />
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#FFE9CB",
    fontWeight: "bold",
  },
  contentText: {
    color: "#FFE9CB",
    fontSize: 16,
  },
  lowStockView: {
    backgroundColor: "transparent",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    height: "27.5%",
    justifyContent: "flex-start",
  },
  itemContainer: {
    flex: 1,
    paddingBottom: 10,
    // backgroundColor: 'red',
  },
  viewHeader: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    gap: 10,
  },
});
