import Bookings from "@/components/home/Bookings";
import React from "react";
import { Text, View } from "react-native";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { authReq } from "../service/requests/auth";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-2">
        <Text className="font-okra-bold text-3xl tracking-tight">
          Bus Tickets
        </Text>
        <UserCircleIcon color="red" size={38} onPress={authReq.logout} />
      </View>

      <Bookings />
    </SafeAreaView>
  );
}
