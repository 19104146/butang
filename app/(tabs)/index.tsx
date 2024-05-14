import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, SafeAreaView, Text, FlatList } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const items = [{name: "Biogesic", quantity: 10}, {name: "Biogesic", quantity: 5}, {name: "Biogesic", quantity: 2}, {name: "Biogesic", quantity: 1}, {name: "Biogesic", quantity: 0}, {name: "Biogesic", quantity: 0}, {name: "Biogesic", quantity: 0}]

export default function OverviewScreen() {
  const headerHeight = useHeaderHeight();
  // const tabBarHeight = useTab;
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={StyleSheet.compose(styles.container, { paddingTop: headerHeight+ 5, paddingBottom: tabBarHeight + 20})}>
      <StatusBar style="light" />
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
          style={styles.lowStockView}
        >
          <View style={styles.viewHeader}>
            <MaterialIcons name="warning-amber" size={22} color="#FF6C4B"/>
            <Text style={styles.headerText}>Low Stocks</Text>
          </View>
          <View style={styles.itemContainer}>
            <FlatList
              data={items}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, paddingRight: 10}}>
                  <Text style={styles.contentText}>{item.name}</Text>
                  <Text style={styles.contentText}>{item.quantity}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={true}
              overScrollMode="never"
              persistentScrollbar={true}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{height: 2, backgroundColor: "#8A8A8A", width: '25%'}}/>
              }}
            />
          </View>
        </LinearGradient>
        <LinearGradient
          dither={false}
          colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
          locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.lowStockView, {height: "15%"}]}
          >
            <Text style={styles.headerText}>Recent Activity</Text>
            <View style={{paddingVertical: 7}}>
              <Text style={[styles.contentText]}>(User) added Biogesic to Food</Text>
              <Text style={{color: "#8A8A8A"}}>7:05AM</Text>
            </View>
          </LinearGradient>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', height: 'auto', flex: 1, gap: 20}}>
            <View style={{flex:1, gap: 15}}>
              <LinearGradient
                dither={false}
                colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
                locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.lowStockView, {height: "60%", width: "100%"}]}
              >
                <View style={[styles.container, {gap: 10}]}>
                  <Text style={[styles.headerText, {fontSize: 32}]}>529</Text>
                  <Text style={{fontSize: 20, color: '#8A8A8A'}}>Items</Text>
                </View>
              </LinearGradient>
              <LinearGradient
                dither={false}
                colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
                locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.lowStockView, {height: "40%", width: "100%"}]}
              >
                <View style={[styles.container, {gap: 0, paddingHorizontal: 0}]}>
                  <Text style={[styles.headerText, {fontSize: 32}]}>100</Text>
                  <Text style={{fontSize: 20, color: '#8A8A8A'}}>Categories</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={{flex:1, gap: 15}}>
              <LinearGradient
                dither={false}
                colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
                locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.lowStockView, {height: "40%", width: "100%"}]}
              >
                <View style={[styles.container, {gap: 10}]}>
                  <Text style={[styles.headerText, {fontSize: 32}]}>420</Text>
                  <Text style={{fontSize: 20, color: '#8A8A8A'}}>Recents</Text>
                </View>
              </LinearGradient>
              <LinearGradient
                dither={false}
                colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
                locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.lowStockView, {height: "60%", width: "100%"}]}
              >
                <View style={[styles.container, {gap: 10}]}>
                  <Text style={[styles.headerText, {fontSize: 32}]}>9</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, color: '#8A8A8A', alignSelf: 'flex-start'}}>Medicine</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="#8A8A8A"/>
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
    padding: 15,
    gap: 20,
  },
  headerText: {
    fontSize: 22 ,
    color: "#FFE9CB",
    fontWeight: "bold",
  },
  contentText: {
    color: '#FFE9CB',
    fontSize: 18,
  },
  lowStockView: {
    backgroundColor: 'transparent',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    height: "30%",
    justifyContent: 'flex-start'
  },
  itemContainer: {
    flex: 1,
    paddingBottom: 10
    // backgroundColor: 'red',
  },
  viewHeader: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    gap: 10,
  },
});
