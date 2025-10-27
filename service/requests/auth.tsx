import { router } from "expo-router";
import apiClient from "../apiClient";
import { storage } from "../storage";

class AuthRequests {
  loginOrSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await apiClient.post("/users/login", { email, password });
    const data = res.data.data;
    await storage.setAccessToken(data.tokens.accessToken);
    await storage.setRefreshToken(data.tokens.refreshToken);
    return data.user;
  };

  logout = async () => {
    await storage.removeAccessToken();
    await storage.removeRefreshToken();
    router.replace("/login");
  };

  refreshTokens = async () => {
    try {
      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token provided");
      }

      const { data } = await apiClient.post("/user/refresh", { refreshToken });
      if (data) {
        await storage.setAccessToken(data);
        return true;
      } else {
        throw new Error("Invalid refresh token response");
      }
    } catch (error) {
      console.log("Token refresh failed", error);
      this.logout();
      return false;
    }
  };
}

export const authReq = new AuthRequests();
