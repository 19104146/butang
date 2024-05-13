import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useHeaderHeight } from "@react-navigation/elements";

export default function InventoryScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={StyleSheet.compose(styles.container, { paddingTop: headerHeight })}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.20, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.card}>
        <LinearGradient
          dither={false}
          colors={["#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{ borderRadius: 20 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 20,
    color:"#E8EAED",
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
