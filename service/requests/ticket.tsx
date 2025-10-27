import { ITicket } from "@/types";
import apiClient from "../apiClient";

class TicketRequests {
  fetchUserTickets = async (): Promise<ITicket[] | []> => {
    const { data } = await apiClient.get("/tickets/my-tickets");
    return data.data || [];
  };

  bookTicket = async ({
    busId,
    date,
    seatNumbers,
  }: {
    busId: string;
    date: string;
    seatNumbers: string;
  }) => {
    const { data } = await apiClient.post("/tickets/book", {
      busId,
      date,
      seatNumbers,
    });
    return data.data;
  };
}

export const ticketReq = new TicketRequests();
