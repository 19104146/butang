import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={style.container}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const style= StyleSheet.create({
  container:{
    flex:1,
  },
});