import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={[style.screen, { paddingTop: headerHeight - 20 }]}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        dither={false}
        colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
        locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={style.container}
      >
        <Text style={style.header2}>Appearance</Text>
        <Text style={style.text}>Theme</Text>
        <Text style={style.text}>Date Format</Text>
      </LinearGradient>
      <LinearGradient
        dither={false}
        colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
        locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={style.container}
      >
        <Text style={style.header2}>Language</Text>
        <Text style={style.text}>System Language</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 20,
  },
  container: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  header2: {
    color: "#FFE9CB",
    fontSize: 22,
    fontWeight: "500",
  },
  text: {
    color: "#FFE9CB",
    fontSize: 14,
    paddingTop: 10,
  },
});
