import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="muchmore/settings" />
      <Stack.Screen name="muchmore/categories" />
      <Stack.Screen name="muchmore/about" />
      <Stack.Screen name="muchmore/help" />
    </Stack>
  );
};

export default RootLayout;
