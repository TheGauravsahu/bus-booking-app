import { queryClient } from "@/service/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  useFonts({
    Okra: require("../assets/fonts/Okra-Regular.ttf"),
    "Okra-Bold": require("../assets/fonts/Okra-Bold.ttf"),
    "Okra-ExtraBold": require("../assets/fonts/Okra-ExtraBold.ttf"),
    "Okra-Medium": require("../assets/fonts/Okra-Medium.ttf"),
    "Okra-MediumLight": require("../assets/fonts/Okra-MediumLight.ttf"),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />  z
        <Stack.Screen name="bus-list" />  z
        <Stack.Screen name="select-seat" />  z
      </Stack>
    </QueryClientProvider>
  );
}
