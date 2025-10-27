import { authReq } from "@/service/requests/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMuatation = useMutation({
    mutationFn: () => authReq.loginOrSignUp({ email, password }),
    onSuccess: () => {
      router.push("/home");
    },
    onError: (err) => {
      console.log("error logging in user", err);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }
    loginMuatation.mutate();
  };

  return (
    <View className="w-full h-full">
      <View className="w-full h-72 flex items-center justify-center">
        <Image
          className="w-full h-72 bg-cover"
          source={require("../assets/images/cover.jpeg")}
        />
      </View>

      <View className="p-4 w-full flex-1">
        <Text className="font-okra font-bold text-xl text-center">
          Create Account or Signin
        </Text>
        <View className="flex-col gap-4  items-center w-full mt-10">
          <TextInput
            placeholder="Enter your email."
            className="h-11 p-2 border border-1 border-black outline-none  w-full"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View className="flex-row items-center border border-black h-11 w-full px-2">
            <TextInput
              placeholder="Enter your password."
              className="flex-1 outline-none"
              value={password}
              secureTextEntry={!showPassword} // 👈 toggle visibility
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={()=>setShowPassword(!showPassword)}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showPassword ? (
                <EyeSlashIcon size={22} color="gray" />
              ) : (
                <EyeIcon size={22} color="gray" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loginMuatation.isPending}
            className="w-full justify-center p-3 items-center bg-tertiary"
          >
            {loginMuatation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-okra font-semibold">LET GO</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-gray-500 font-okra font-medium text-center mt-10 w-72 self-center">
          By Signing up your agree to our Terms and Conditions and Privacy
          Policy.
        </Text>
      </View>
    </View>
  );
}
