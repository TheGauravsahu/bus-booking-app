import { authReq } from "@/service/requests/auth";
import { storage } from "@/service/storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { Alert, Image, View } from "react-native";

interface DecodedToken {
  exp: number;
}

export default function SplashScreen() {
  const router = useRouter();

  const verifyToken = async () => {
    const accessToken = await storage.getAccessToken();
    const refreshToken = await storage.getRefreshToken() as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken.exp < currentTime) {
        router.push("/login");
        Alert.alert("Session expired, please login again.");
        return;
      }

      if (decodedAccessToken.exp < currentTime) {
        const newAccessToken = await authReq.refreshTokens();
        if (!newAccessToken) {
          Alert.alert("Something went wrong");
          return;
        }
      }

      return router.push("/home");
    }
    router.push("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      verifyToken();
    }, 1500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../assets/images/logo_t.png")}
        className="h-[30%] w-[60%]"
        resizeMode="contain"
      />
    </View>
  );
}
