import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { UserGroupIcon } from "react-native-heroicons/solid";

interface PaymentButtonProps {
  onPay: () => void;
  seats: number;
  price: number;
}
export default function PaymentButton({
  onPay,
  price,
  seats,
}: PaymentButtonProps) {
  return (
    <View className="abolute bottom-0 pb-5 shadow-md bg-white w-full rounded-t-xl p-4 ">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-semibold font-okra text-xl">Amount</Text>
          <Text className="font-okra text-xl">Tax included</Text>
        </View>
        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-gray-500 font-okra line-through">
              ₹{(seats * price > 200 ? 100 : 0).toFixed(0)}
            </Text>

            <Text className=" font-okra">₹{(seats * price).toFixed(0)}</Text>
          </View>
          <View
            className="flex-row seld-end
             items-center gap-1"
          >
            <UserGroupIcon color={"gray"} size={16} />
            <Text className="font-okra text-md">{seats} P</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPay}
        className="bg-tertiary my-4 rounded-xl justify-center items-center p-3"
      >
        <Text className="text-white font-semibold text-xl font-okra">
          Pay Now!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
