import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, View } from "react-native";

import LowStocks from "@/components/LowStocks";
import { CategoryCard, ItemCard, RecentCard, SomethingCard } from "@/components/OverviewCards";
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
      <View style={styles.innerContainer}>
        <View style={styles.splitContainer}>
          <ItemCard />
          <CategoryCard />
        </View>
        <View style={styles.splitContainer}>
          <RecentCard />
          <SomethingCard />
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
  innerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
    flex: 1,
    gap: 20,
  },
  splitContainer: {
    flex: 1,
    gap: 15,
  },
});
