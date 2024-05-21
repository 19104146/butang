import { useMemo } from "react";

import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { type Activity } from "@/data-access/activities";

const dummyActivities = [
  {
    id: "1",
    sender: "User",
    message: 'Added "Lorem ipsum" to "Dolor"',
    createdAt: "2024-05-16T15:49:26.978Z",
  },
  {
    id: "2",
    sender: "User",
    message: 'Added "Sit amet" to "Dolor"',
    createdAt: "2024-05-16T15:50:43.813Z",
  },
  {
    id: "3",
    sender: "User",
    message: 'Added "Biogesic" to "Medicine"',
    createdAt: "2024-05-17T15:50:43.813Z",
  },
];

export default function ActivityScreen() {
  const headerHeight = useHeaderHeight();

  const groupActivities = useMemo(() => {
    return Object.values(
      dummyActivities.reduceRight(
        (acc, activity) => {
          const date = activity.createdAt.substring(0, 10);
          acc[date] = (acc[date] || []).concat(activity);
          return acc;
        },
        {} as { [date: string]: Activity[] },
      ),
    );
  }, []);

  return (
    <View style={StyleSheet.compose(styles.container, { paddingTop: headerHeight })}>
      <LinearGradient
        dither={false}
        colors={["#D99536", "#B77E2E", "#936525", "#69481A", "#452F11", "#191106", "#0D0903", "#060402", "#000000"]}
        locations={[0, 0.03, 0.06, 0.11, 0.16, 0.27, 0.67, 0.86, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
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
