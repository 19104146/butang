import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MoreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.card}>
        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.compose(StyleSheet.absoluteFill, { borderRadius: 20 })}
        />
        <Image style={styles.logo} source={require("@/assets/icon.png")} />
        <Text style={styles.butang}>Butang</Text>
      </View>

      <View style={styles.sec2}>
        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.smolNav, { padding: 0 }]}
        >
          <Link href="/settings" style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="settings" size={36} color="#FFE9CB" />
              <Text style={styles.text}>Settings</Text>
            </View>
          </Link>
        </LinearGradient>

        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.smolNav, { padding: 0 }]}
        >
          <Link href="/categories" style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="category" size={36} color="#FFE9CB" />
              <Text style={styles.text}>Categories</Text>
            </View>
          </Link>
        </LinearGradient>

        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.smolNav, { padding: 0 }]}
        >
          <Link href="/about" style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="info" size={36} color="#FFE9CB" />
              <Text style={styles.text}>About</Text>
            </View>
          </Link>
        </LinearGradient>

        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.smolNav, { padding: 0 }]}
        >
          <Link href="/help" style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="help" size={36} color="#FFE9CB" />
              <Text style={styles.text}>Help</Text>
            </View>
          </Link>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 20,
    color: "#E8EAED",
  },
  sec2: {
    width: "100%",
    gap: 20,
  },
  smolNav: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  lenk: {
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFE9CB",
    marginLeft: 20,
    alignSelf: "center",
  },
  card: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "50%",
    height: "50%",
    alignSelf: "center",
  },
  butang: {
    color: "#FFE9CB",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
  },
});
