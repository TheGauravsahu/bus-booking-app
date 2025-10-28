import { locations } from "@/utils/dummyData";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: string, type: "from" | "to") => void;
  type: "from" | "to";
  fromLocation?: string;
}
export default function LocationPickerModal({
  visible,
  onClose,
  onSelect,
  fromLocation,
  type,
}: LocationPickerModalProps) {
  const [search, setSearch] = useState("");

  const filteredLocations = locations.filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal transparent={false} visible={visible} animationType="slide">
      <View className="bg-white p-4 flex-1">
        <SafeAreaView />
        <Text className="font-okra-bold text-lg text-center mb-4">
          Select {type === "from" ? "Departure" : "Destination"} city
        </Text>

        <TextInput
          className="p-3 border border-gray-400 rounded-md mb-4"
          placeholder="Search City..."
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredLocations}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-300"
              onPress={() => {
                if (type == "to" && item === fromLocation) {
                  return;
                }
                onSelect(item, type);
                onClose();
              }}
            >
              <Text
                className={`text-md font-okra ${
                  item === fromLocation ? "text-gray-400" : "text-black"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={onClose}
          className="bg-gray-300 p-3 rounded-lg mt-4"
        >
          <Text className="text-center text-black font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView />
    </Modal>
  );
}
