import AsyncStorage from "@react-native-async-storage/async-storage";
class Storage {
  setAccessToken = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
  };
  getAccessToken = async () => {
    return await AsyncStorage.getItem("accessToken");
  };
  removeAccessToken = async () => {
    await AsyncStorage.removeItem("accessToken");
  };

  setRefreshToken = async (token: string) => {
    await AsyncStorage.setItem("refreshToken", token);
  };
  getRefreshToken = async () => {
    return await AsyncStorage.getItem("refreshToken");
  };
  removeRefreshToken = async () => {
    await AsyncStorage.removeItem("refreshToken");
  };
}

export const storage = new Storage();
