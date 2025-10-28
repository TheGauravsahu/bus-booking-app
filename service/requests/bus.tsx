import { IBus } from "@/types";
import apiClient from "../apiClient";

class BusRequests {
  fetchBuses = async ({
    from,
    to,
    date,
  }: {
    from: string;
    to: string;
    date: string;
  }): Promise<IBus[] | []> => {
    const { data } = await apiClient.post("/buses/search", { from, to, date });
    return data?.data || [];
  };

  fetchBusDetails = async (busId: string): Promise<IBus> => {
    const { data } = await apiClient.get(`/buses/${busId}`);
    return data?.data;
  };
}

export const busReq = new BusRequests();
