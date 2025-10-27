import { ITicket } from "@/types";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ArrowUpOnSquareIcon, XMarkIcon } from "react-native-heroicons/solid";

interface TicketModalProps {
  visible: boolean;
  onClose: () => void;
  bookingInfo: ITicket;
}

export default function TicketModal({
  visible,
  onClose,
  bookingInfo,
}: TicketModalProps) {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "#2A2526" }}
      >
        <TouchableOpacity
          onPress={onClose}
          className="bg-white mb-4 shadow-sm rounded-full p-2"
        >
          <XMarkIcon color="black" size={22} />
        </TouchableOpacity>
        <View className="bg-white relative overflow-hidden rounded-xl w-[90%] p-4 shadow-lg">
          <Text className="text-center text-lg font-bold mb-2">
            Your Ticket
          </Text>
          <View className="absolute border-t border-dotted left-[-14px] top-[60%] -translate-y-2"></View>

          <View className="bg-gray-100 p-2 rounded-lg">
            <Text className="text-gray-700 font-semibold">
              {bookingInfo.bus.to} → {bookingInfo.bus.from}
            </Text>
            <Text className="text-gray-500 text-sm">
              {bookingInfo.bus.departureTime} - {bookingInfo.bus.arrivalTime},{" "}
              {bookingInfo.date}
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-gray-700">{bookingInfo.bus.company}</Text>
            <Text className="text-gray-500 text-sm">
              {bookingInfo.bus.busType}
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-gray-700">Seats</Text>
            <Text className="text-gray-500 text-sm">
              {bookingInfo.seatNumbers.toString()}
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-gray-700">Ticket #{bookingInfo._id}</Text>
            <Text className="text-gray-700">PNR #: {bookingInfo.pnr}</Text>
            <Text className="text-green-600 mt-2 font-bold text-lg">
              ₹{bookingInfo.total_fare}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="bg-red-500 flex-row gap-2 p-3 rounded-lg mt-4 jsutify-center items-center">
          <ArrowUpOnSquareIcon color="white" />
          <Text className="text-white font-semibold">Share your ticket</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
