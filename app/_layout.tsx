import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} redirect />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="homeIconRoute/Expenses"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homeIconRoute/Balance"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homeIconRoute/Goals"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homeIconRoute/Chart"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
