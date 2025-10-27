import { busReq } from "@/service/requests/bus";
import { IBus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusList() {
  const router = useRouter();
  const { from, to, date }: { from: string; to: string; date: string } =
    useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["buses", from, to, date],
    queryFn: () => busReq.fetchBuses({ from, to, date }),
    enabled: !!from && !!to && !!date,
  });

  const renderItem = ({ item }: { item: IBus }) => {
    return (
      <TouchableOpacity
        className="bg-white mb-4 p-4 rounded-lg shadow-sm"
        onPress={() => {
          router.push({
            pathname: "/select-seat",
            params: { busId: item.bus_id },
          });
        }}
      >
        <Image
          style={{ width: 22, height: 22 }}
          source={require("../assets/images/sidebus.png")}
        />

        <Text className="text-lg font-okra font-bold text-gray-900">
          {item.company}
        </Text>
        <Text className="text-sm font-okra text-gray-500">{item.busType}</Text>

        <View className="flex-row justify-between mt-2">
          <Text className="text-lg font-okra  font-semibold text-gray-700">
            {new Date(item.departureTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            -
            {new Date(item.arrivalTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
          <Text className="text-sm  font-okra text-gray-500">
            {item.duration}
          </Text>
        </View>

        <View className="flex-row justify-between mt-2 items-center">
          <View className="flex-row gap-2 items-center">
            <Text className="text-md font-okra text-green-600 font-bold">
              ₹{item.price}
            </Text>
            <Text className="text-xs font-okra text-gray-400 line-through">
              ₹{item.originalPrice}
            </Text>
          </View>

          <Text className="text-sm font-okra text-gray-600">
            {item.seats.flat().filter((seat) => !seat.booked).length} Seats
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const buses = data || [];
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />
      <View className="flex-row items-center border-b-[1px] p-4 border-teal-800 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <View className="ml-4">
          <Text className="text-lg font-bold font-okra">
            {from} → {to}
          </Text>
          <Text className="text-sm text-gray-500 font-okra">
            {new Date(date).toDateString()}
          </Text>
        </View>
      </View>

      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="teal" />
          <Text>Loading buses...</Text>
        </View>
      )}

      {error && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 font-bold">Failed to load buses.</Text>
        </View>
      )}

      {!error && !isLoading && buses.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 font-bold">No buses availabe.</Text>
        </View>
      )}
      <FlatList
        data={buses}
        keyExtractor={(item) => item.bus_id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
