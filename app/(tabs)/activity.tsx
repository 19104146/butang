import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const dummyActivities = [
  {
    id: 1,
    message: '(User) Added "Lorem ipsum" to "Dolor"',
    createdAt: new Date("2024-05-16T15:49:26.978Z"),
  },
  {
    id: 2,
    message: '(User) Added "Sit amet" to "Dolor"',
    createdAt: new Date("2024-05-16T15:50:43.813Z"),
  },
  {
    id: 3,
    message: '(User) Added "Biogesic" to "Medicine"',
    createdAt: new Date("2024-05-17T15:50:43.813Z"),
  },
];

interface Activity {
  id: string;
  message: string;
  createdAt: Date;
}

function ActivityCard({ activities }: { activities: Activity[] }) {
  const date = activities[0].createdAt.toLocaleDateString();

  return (
    <LinearGradient
      dither={false}
      colors={["#925D11", "#6F4A16", "#573E1A", "#45351D", "#2D2922", "#201E1B"]}
      locations={[0, 0.13, 0.29, 0.41, 0.68, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={styles.card}
    >
      <View style={{ gap: 10 }}>
        <Text style={[styles.text, { fontSize: 20 }]}>{date}</Text>
        {activities.map((activity) => (
          <View key={activity.id}>
            <Text style={styles.text}>{activity.message}</Text>
            <Text style={{ color: "#8A8A8A", fontSize: 12 }}>{activity.createdAt.toLocaleTimeString()}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

export default function ActivityScreen() {
  const headerHeight = useHeaderHeight();

  const groupedActivities = dummyActivities.reduce(
    (acc, activity) => {
      const date = activity.createdAt.toLocaleDateString();
      acc[date] = (acc[date] || []).concat(activity);
      return acc;
    },
    {} as { [date: string]: Activity[] },
  );

  const activities = Object.values(groupedActivities);

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
        {activities.map((activity) => (
          <ActivityCard key={activity[0].id} activities={activity} />
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
