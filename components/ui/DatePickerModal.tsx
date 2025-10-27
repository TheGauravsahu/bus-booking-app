import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  selectedDate: Date;
}

export default function DatePickerModal({
  visible,
  onClose,
  onConfirm,
  selectedDate,
}: DatePickerModalProps) {
  const [tempDate, setTempDate] = useState(selectedDate);

  if (Platform.OS === "android") {
    return (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="default"
        onChange={(event, date) => {
          if (date) {
            onConfirm(date)
            onClose()
          }
        }}
      />
    );
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-center"
        style={{ backgroundColor: 'rgb(0,0,0,0,0.5)' }}>
        <View className="bg-whtie p-4 rounded-3xl mx-2">
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="default"
              onChange={(event, date) => date && setTempDate(date)}
            />
          )}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-white-300 rounded-lg flex-1 mx-2"
              onPress={onClose}
            >
              <Text className="text-center text-black font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 rounded-lg flex-1 mx-2"
              onPress={() => {
                onConfirm(tempDate)
                onClose()
              }}
            >
              <Text className="text-center text-black font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </Modal>
  );
}
