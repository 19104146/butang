import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const dummyCategories = [
  { label: "Medicine", value: "1" },
  { label: "Beverage", value: "2" },
];

export default function Categories() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[style.container, { paddingTop: headerHeight }]}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      {dummyCategories.map((Categories) => (
        
        <View key={Categories.label} style={{ flexDirection: "row", justifyContent: "space-between",alignContent:"center",margin:10, padding:10,paddingHorizontal:20,borderColor:"#D0D0D020",borderWidth:1,borderRadius:15}}>
          <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={StyleSheet.compose(StyleSheet.absoluteFill, { borderRadius: 15 })}
        />
          <Text style={style.text}>{Categories.label}</Text>
          <View style={{backgroundColor:"#6A655F" ,paddingHorizontal:10, alignSelf:"center",borderRadius:10}}>
            <Text style={{fontSize:14,color:"#FFE9CB"}}>{Categories.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFE9CB",
  },
});
