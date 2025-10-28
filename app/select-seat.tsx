import PaymentButton from "@/components/ui/PaymentButton";
import Seat from "@/components/ui/Seat";
import TicketModal from "@/components/ui/TicketModal";
import { busReq } from "@/service/requests/bus";
import { ticketReq } from "@/service/requests/ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectSeat() {
  const router = useRouter();
  const [ticketVisible, setTicketVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { busId }: { busId: string } = useLocalSearchParams();

  const {
    data: bus,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["buse", busId],
    queryFn: () => busReq.fetchBusDetails(busId),
    enabled: !!busId,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [busId])
  );

  const bookTicketMutation = useMutation({
    mutationFn: ({
      busId,
      date,
      seatNumbers,
    }: {
      busId: string;
      date: string;
      seatNumbers: number[];
    }) =>
      ticketReq.bookTicket({
        busId,
        date,
        seatNumbers,
      }),
    onSuccess: () => {
      // console.log()
      setTicketVisible(true);
    },
    onError: (err) => {
      console.log("Error booking ticket", err);
      Alert.alert("Failed to book ticket. Please try again.");
    },
  });

  const handleOnPay = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Please select at least one seat.");
      return;
    }
    bookTicketMutation.mutate({
      busId,
      date: bus?.departureTime!,
      seatNumbers: selectedSeats,
    });
  };

  const handleSeatSelection = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  if (isLoading) {
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="teal" />
      <Text className="text-gray-500">Loading seats...</Text>
    </View>;
  }

  if (isError) {
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 font-bold">Failed to load buses.</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-blue-500">Go Back</Text>
      </TouchableOpacity>
    </View>;
  }


  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />
      {/* HEADER */}
      <View className="flex-row  p-4 items-center border-b-[1px] border-red-400 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={24} color={"#000"} />
        </TouchableOpacity>
        <View className="ml-4">
          <Text className="text-lg font-bold font-okra">Seat Selection</Text>
          <Text className="text-sm font-semibold font-okra">
            {bus?.from} → {bus?.to}
          </Text>
          <Text className="text-sm text-gray-500 font-okra">
            {new Date(bus?.departureTime!).toDateString()}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pb-20 bg-red-100 p-4"
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Seat
          selectedSeats={selectedSeats}
          seats={bus?.seats}
          onSelectSeat={handleSeatSelection}
        />
        <View className="bg-white rounded-lg p-4 drop-shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold font-okra">
              {bus?.company}
            </Text>
            <View className="flex-row gap-1 items-center">
              <StarIcon size={18} color={"gold"} />
              <Text className="ml-1 text-gray-600 text-sm">
                {bus?.rating} ({bus?.totalReviews})
              </Text>
            </View>
          </View>
          <Text className="text-sm text-gray-600 mb-1">{bus?.busType}</Text>
          <View className="flex-row justify-between mt-2">
            <View className="items-center">
              <Text className="text-lg font-okra-bold">
                {new Date(bus?.departureTime!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text className="text-sm text-gray-500">Departure</Text>
            </View>
            <Text className="text-sm text-gray-500">{bus?.duration}</Text>
            <View className="items-center">
              <Text className="text-lg font-okra-bold">
                {new Date(bus?.arrivalTime!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text className="text-sm text-gray-500">Arrival</Text>
            </View>
          </View>

          <Text className="mt-3 font-okra text-green-600 text-sm">
            {bus?.seats.flat().filter((seat) => !seat.booked).length} Seats
            Availblable
          </Text>

          <View className="flex-row items-center mt-2">
            <Text className="text-gray-800 font-okra line-through text-lg">
              ₹{bus?.originalPrice}
            </Text>
            <Text className="font-okra-bold ml-2 text-xl">
              ₹{bus?.price}/person
            </Text>
          </View>

          <View className="flex-row gap-2 mt-3">
            {bus?.badges.map((b, i) => (
              <View key={i} className="bg-yellow-200 px-2 py-1 rounded-full">
                <Text className="text-xs text-yellow-800 font-semibold font-okra">
                  {b}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <PaymentButton
        seats={selectedSeats.length}
        price={Number(bus?.price)}
        onPay={handleOnPay}
      />

      {ticketVisible && (
        <TicketModal
          visible={ticketVisible}
          onClose={() => {
            router.push("/home");
            setTicketVisible(false);
          }}
          bookingInfo={bookTicketMutation.data}
        />
      )}
    </View>
  );
}
