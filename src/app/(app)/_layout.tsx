import { Slot, Stack } from "expo-router";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

export default function AppGroupLayout() {
  const { isSignedIn } = useAuth();
  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
