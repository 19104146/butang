import { useEffect, useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { Activity, listActivities } from "@/data-access/activities";

export default function RecentActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await listActivities();

      setActivity(fetchedActivity[fetchedActivity.length - 1]);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.lowStockView, { height: "17%" }]}
    >
      <Text style={styles.headerText}>Recent Activity</Text>
      <View style={{ paddingVertical: 7 }}>
        {!activity ? (
          <Text style={[styles.contentText, { color: "grey" }]}>No activities yet</Text>
        ) : (
          <>
            <Text style={[styles.contentText]}>{`(${activity.sender}) ${activity.message}`}</Text>
            <Text style={{ color: "#8A8A8A" }}>{new Date(activity.createdAt).toLocaleTimeString()}</Text>
          </>
        )}
      </View>
    </LinearGradient>
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
