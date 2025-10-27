import { busReq } from "@/service/requests/bus";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SelectSeat() {
  const { busId }: { busId: string } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["buse", busId],
    queryFn: () => busReq.fetchBusDetails(busId),
    enabled: !!busId,
  });

  return (
    <View>
      <Text>SelectSeat</Text>
    </View>
  );
}
