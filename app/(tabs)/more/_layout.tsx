import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Categories" />
      <Stack.Screen name="About" />
      <Stack.Screen name="Help" />
    </Stack>
  );
};

export default RootLayout;
