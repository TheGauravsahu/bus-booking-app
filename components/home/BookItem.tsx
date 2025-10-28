import { ITicket } from "@/types";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { UserGroupIcon } from "react-native-heroicons/solid";
import TicketModal from "../ui/TicketModal";

export default function BookItem({ item }: { item: ITicket }) {
  const [ticketVisible, setTicketVisible] = useState(false);

  return (
    <View className="bg-gray-100 p-4 rounded-[20px] shadow-sm mb-3">
      <View className="flex-row justify-between mb-2">
        <View className="flex-row gap-2 items-center">
          <Image
            source={require("../../assets/images/sidebus.png")}
            style={{ width: 12, height: 12 }}
            className=""
          />
          <Text className="text-gray-500">{item.status}</Text>
        </View>

        <Text className="text-lg text-bold">
          {item.bus.from} → {item.bus.to}
        </Text>
      </View>

      <Text className="text-gray-600">
        {new Date(item.date).toDateString()}
      </Text>
      <Text className="text-gray-600">{item.bus.busType}</Text>

      <View className="flex-row items-center mt-2">
        <UserGroupIcon size={18} color="gray" />
        <Text className="ml-2 text-gray-500">
          {item.seatNumbers.toString()}
        </Text>
      </View>

      {item.status === "Cancelled" && (
        <Text className="text-green-600 font-bold mt-2">Refund completed.</Text>
      )}

      <TouchableOpacity
        onPress={() => setTicketVisible(true)}
        className="mt-2 bg-red-500 py-2 px-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">See Ticket</Text>
      </TouchableOpacity>

      {ticketVisible && (
        <TicketModal
          visible={ticketVisible}
          onClose={() => setTicketVisible(false)}
          bookingInfo={item}
        />
      )}
    </View>
  );
}
