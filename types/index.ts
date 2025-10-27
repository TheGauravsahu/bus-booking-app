export interface IUser {
  _id: string;
  phone: string;
  name: string;
  email: string;
  user_image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITicket {
  _id: string;
  user: IUser;
  bus: IBus;
  date: string;
  seatNumbers: number[];
  total_fare: number;
  status: "Upcoming" | "Completed" | "Cancelled";
  pnr: string;
  booked_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISeat {
  _id: string;
  seat_id: number;
  type: "window" | "side" | "path";
  booked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBus {
  _id: string;
  bus_id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  availableSeats: number;
  price: number;
  originalPrice: number;
  company: string;
  busType: string;
  rating: number;
  totalReviews: number;
  badges: string[];
  seats: ISeat[];
  createdAt: string;
  updatedAt: string;
}
