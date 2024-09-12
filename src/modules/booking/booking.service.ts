import { carService } from "../car/car.service";
import { TBooking, TQuery } from "./booking.interface";
import Booking from "./booking.model";

const bookingACar = async (data: TBooking) => {
  const carId = data.car.toString();
  const isCarAvailable = await carService.availableCar(carId);
  if (!isCarAvailable) {
    throw new Error("Car is not available");
  }
  const booking = (await (await Booking.create(data)).populate("car")).populate(
    {
      path: "user",
      select: "-password",
    }
  );
  return booking;
};

const getAllBookings = async ({ carId, date }) => {
  const filter: TQuery = {};
  if (carId) {
    filter["car"] = carId;
  }
  if (date) {
    filter["date"] = date;
  }
  const bookings = await Booking.find(filter).populate("car").populate({
    path: "user",
    select: "-password",
  });
  return bookings;
};

const myBookings = async (userId: string) => {
  const bookings = await Booking.find({ user: userId })
    .populate("car")
    .populate({
      path: "user",
      select: "-password",
    });
  return bookings;
};

export const bookingService = {
  bookingACar,
  getAllBookings,
  myBookings,
};
