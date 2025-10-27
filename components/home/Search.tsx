import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import DatePickerModal from "../ui/DatePickerModal";
import LocationPickerModal from "../ui/LocationPickerModal";

export default function Search() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationType, setLocationType] = useState<"from" | "to">("from");
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleLocationSelect = (location: string, type: "from" | "to") => {
    if (type === "from") {
      setFrom(location);
      if (location === to) {
        setTo("");
      }
    } else {
      setTo(location);
    }
  };


  const handleSearchBuses = () => {
    if (!from || !to) {
      Alert.alert(
        "Missing information",
        "Please select both departure and destination locations."
      );
      return;
    }
    if (from === to) {
      Alert.alert(
        "Invalid Selection",
        "Departure and destination locations cannot be the same."
      );
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      Alert.alert(
        "Invalid Date",
        "Please select a future date for your journey."
      );
      return;
    }
    router.push({
      pathname: "/bus-list",
      params:{
        from,to,date:date.toISOString()
      }
     });
  };

  return (
    <View className="rounded-b-3xl overflow-hidden ">
      <LinearGradient
        colors={["#78B0E6", "#fff"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="p-4">
          <View className="my-4 border border-1 border-gray-600 z-20 rounded-md bg-white ">
            <TouchableOpacity
              onPress={() => {
                setLocationType("from");
                setShowLocationPicker(true);
              }}
              className="p-4 flex-row border-b border-1 border-gray-300  items-center gap-4"
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/images/bus.png")}
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {from || "From"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLocationType("to");
                setShowLocationPicker(true);
              }}
              className="p-4 border-b border-1 border-gray-300  flex-row items-center gap-4"
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/images/bus.png")}
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || "To"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center p-2 justify-between gap-2">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="rounded-lg bg-secondary mr-2  p-2"
                  onPress={() => setDate(new Date())}
                >
                  <Text className="font-okra-bold text-sm">Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-lg bg-secondary p-2"
                  onPress={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}
                >
                  <Text className="font-okra-bold text-sm">Tomorrow</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setShowDatePicker(!showDatePicker)}
              >
                <View className="mr-3">
                  <Text className="text-gray-500 font-okra text-sm">
                    Date of Journey
                  </Text>
                  <Text className="text-gray-900 font-okra-bold text-md">
                    {date.toDateString()}
                  </Text>
                </View>
                <CalendarDaysIcon color="#000" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-tertiary p-3 my-2 gap-2 flex-row items-center rounded-xl
            justify-center"
            onPress={handleSearchBuses}
          >
            <MagnifyingGlassIcon color={"#fff"} size={22} />
            <Text className="text-white font-okra-bold">Search Buses</Text>
          </TouchableOpacity>

          <Image
            className="w-full rounded-lg my-4 bg-cover"
            style={{ height: 160 }}
            source={require("../../assets/images/sidebus.jpg")}
          />
        </View>
      </LinearGradient>

      {showDatePicker &&
        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={(d) => setDate(d)}
          selectedDate={date}
        />
      }

      {showLocationPicker &&
        <LocationPickerModal
          visible={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
          onSelect={handleLocationSelect}
          type={locationType}
          fromLocation={from || ""}
        />
      }
    </View>
  );
}
