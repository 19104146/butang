import { useEffect, useMemo, useState } from "react";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { listActivities, type Activity } from "@/data-access/activities";

export default function ActivityScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivities = await listActivities();
      setActivities(fetchedActivities);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const groupActivities = useMemo(() => {
    return Object.values(
      activities.reduceRight(
        (acc, activity) => {
          const date = activity.createdAt.substring(0, 10);
          acc[date] = (acc[date] || []).concat(activity);
          return acc;
        },
        {} as { [date: string]: Activity[] },
      ),
    );
  }, [activities]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ height: headerHeight, backgroundColor: "transparent" }}></View>
      <ScrollView contentContainerStyle={StyleSheet.compose(styles.container, { paddingBottom: 5 })}>
        <View style={styles.innerContainer}>
          {groupActivities.map((activities, index) => (
            <LinearGradient
              key={index}
              dither={false}
              colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
              locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.card}
            >
              <View style={{ gap: 10 }}>
                <Text style={[styles.text, { fontSize: 20 }]}>
                  {new Date(activities[0].createdAt).toLocaleDateString()}
                </Text>
                {activities.map((activity) => (
                  <View key={activity.id}>
                    <Text style={styles.text}>{`(${activity.sender}) ${activity.message}`}</Text>
                    <Text style={{ color: "#8A8A8A", fontSize: 12 }}>
                      {new Date(activity.createdAt).toLocaleTimeString()}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
      <View style={{ height: tabBarHeight, backgroundColor: "transparent" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 20,
    color: "#E8EAED",
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    width: "100%",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    fontWeight: "700",
    color: "#FFE9CB",
  },
});
