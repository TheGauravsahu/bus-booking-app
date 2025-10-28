import { ISeat } from "@/types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AvailableIcon from "../../assets/images/available.jpg";
import BookedIcon from "../../assets/images/booked.jpg";
import SelectedIcon from "../../assets/images/selected.jpg";

interface SeatProps {
  selectedSeats: number[] | undefined;
  seats: ISeat[] | undefined;
  onSelectSeat: (seatId: number) => void;
}

export default function Seat({
  selectedSeats,
  seats,
  onSelectSeat,
}: SeatProps) {
  const groupedSeats = [];
  if (seats) {
    for (let i = 0; i < seats.length; i += 4) {
      groupedSeats.push(seats.slice(i, i + 4));
    }
  }

  return (
    <View className="mb-4 flex-row justify-between w-full">
      <View className="w-[30%] items-center bg-white rounded-2xl p-4">
        <Text className="font-okra font-bold text-lg mb-4">Seat Type</Text>
        <View className="items-center mb-4">
          <Image
            source={SelectedIcon}
            style={{ width: 40, height: 40 }}
            className="my-1"
          />
          <Text className="font-okra text-md mb-4">Selected</Text>
        </View>
        <View className="items-center mb-4">
          <Image
            source={AvailableIcon}
            style={{ width: 40, height: 40 }}
            className="my-1"
          />
          <Text className="font-okra text-md mb-4">Available</Text>
        </View>
        <View className="items-center mb-4">
          <Image
            source={BookedIcon}
            style={{ width: 40, height: 40 }}
            className="my-1"
          />
          <Text className="font-okra text-md mb-4">Booked</Text>
        </View>
      </View>

      <View className="w-[65%] bg-white rounded-2xl flex-col items-center justify-center p-4">
        <View className="w-full h-8 pr-4">
          <Image
            source={require("../../assets/images/wheel.png")}
            style={{ width: 25, height: 25, alignSelf: "flex-end" }}
          />
        </View>

        <View className="mt-4 w-full">
          {groupedSeats.map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="flex-row justify-between items-center mb-2"
            >
              {row.map((seat) =>
                seat.type === "path" ? (
                  <View
                    key={seat.seat_id}
                    style={{ width: 40, height: 40, margin: 4 }}
                  />
                ) : (
                  <TouchableOpacity
                    key={seat.seat_id}
                    disabled={seat.booked}
                    onPress={() => onSelectSeat(seat.seat_id)}
                  >
                    <Image
                      style={{ width: 40, height: 40, margin: 4 }}
                      source={
                        selectedSeats?.includes(seat.seat_id)
                          ? SelectedIcon
                          : seat.booked
                          ? BookedIcon
                          : AvailableIcon
                      }
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
