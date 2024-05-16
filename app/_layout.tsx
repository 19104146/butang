import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { db } from "@/db";
import migrations from "@/drizzle/migrations";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  // const { success, error } = useMigrations(db, migrations);
  // useEffect(() => {
  //   if (error) {
  //     throw error;
  //   }
  // }, [error]);
  // useEffect(() => {
  //   if (success) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [success]);
  // return (
  //   success && (
  //     <>
  //       <StatusBar style="light" />
  //       <Stack>
  //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       </Stack>
  //     </>
  //   )
  // );
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
