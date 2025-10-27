import { ticketReq } from "@/service/requests/ticket";
import { ITicket } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookItem from "./BookItem";
import Search from "./Search";

const tabs = ["All", "Upcoming", "Completed", "Cancelled"];

export default function Bookings() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: tickets,
    isLoading,
    isError,
    refetch,
  } = useQuery<ITicket[]>({
    queryKey: ["userTickets"],
    queryFn: ticketReq.fetchUserTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredBookings =
    selectedTab === "All"
      ? tickets
      : tickets?.filter((ticket: ITicket) => ticket.status === selectedTab);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="teal" />
        <Text className="text-gray-500 mt-2 font-okra">Loading bookings...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 font-medium text-base font-okra">Failed to get bookings</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 p-2 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        data={filteredBookings}
        nestedScrollEnabled
        ListHeaderComponent={
          <>
            <Search />
            <Text className="text-2x font-okra font-bold my-4">
              Past Bookings
            </Text>
            <View className="flex-row gap-2 items-center">
              {tabs.map((t, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedTab(t)}
                  className={`font-semibold  px-4 py-2 rounded-lg mx-1 ${selectedTab === t ? "bg-red-500 *:text-white" : "bg-gray-300 *:text-black"}`}
                >
                  <Text className="text-sm font-bold">{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <View className="items-center mt-6">
            <Text className="text-gray-500">No bookings found.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <BookItem item={item} />}
      />
    </View>
  );
}
