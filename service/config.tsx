import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.31.111:4000/api"
    : "http://localhost:4000/api";
