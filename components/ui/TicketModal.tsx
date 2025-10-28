import { ITicket } from "@/types";
import React from "react";
import { Modal, Share, Text, TouchableOpacity, View } from "react-native";
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
  const handleShare = async () => {
    try {
      const message = [
        "🎟️ Bus Ticket Details",
        "",
        `🚌 Bus: ${bookingInfo.bus.company} (${bookingInfo.bus.busType})`,
        `📍 Route: ${bookingInfo.bus.from} → ${bookingInfo.bus.to}`,
        `📅 Date: ${new Date(bookingInfo.date).toLocaleDateString()}`,
        `💺 Seats: ${bookingInfo.seatNumbers.join(", ")}`,
        `💰 Fare: ₹${bookingInfo.total_fare}`,
        `🆔 PNR: ${bookingInfo.pnr}`,
        "",
        "Download our app to manage your bookings!",
      ].join("\n");
      await Share.share({
        title: "Your Bus Ticket",
        message,
      });
    } catch (error) {
      console.log("Error sharing ticket:", error);
    }
  };

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
          <Text className="text-center text-lg font-okra-bold mb-2">
            Your Ticket
          </Text>

          <View className="bg-gray-100 p-2 rounded-lg">
            <Text className="text-gray-700 font-semibold">
              {bookingInfo.bus.to} → {bookingInfo.bus.from}
            </Text>
            <Text className="text-gray-500 text-sm">
              {new Date(bookingInfo.bus.departureTime).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(bookingInfo.bus.arrivalTime).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              , {new Date(bookingInfo.date).toLocaleDateString()}
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

        <TouchableOpacity
          onPress={handleShare}
          className="bg-red-500 flex-row gap-2 p-3 rounded-lg mt-4 jsutify-center items-center"
        >
          <ArrowUpOnSquareIcon color="white" />
          <Text className="text-white font-semibold">Share your ticket</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
