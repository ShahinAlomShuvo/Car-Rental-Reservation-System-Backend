import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import Car from "../car/car.model";
import { carService } from "../car/car.service";
import { TBooking, TQueryProps, TQuery } from "./booking.interface";
import Booking from "./booking.model";

const bookingACar = async (data: TBooking) => {
  const session = await Booking.startSession();
  const carId = data.car.toString();
  const isCarAvailable = await carService.availableCar(carId);
  if (!isCarAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car is not available");
  }
  try {
    session.startTransaction();

    const booking = await Booking.create([data], { session });

    await Car.findByIdAndUpdate(carId, { status: "unavailable" }, { session });

    await session.commitTransaction();

    const createdBooking = await Booking.findById({
      _id: booking[0]._id.toString(),
    })
      .populate("car")
      .populate({
        path: "user",
        select: "-password",
      });
    return createdBooking;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }
  session.endSession();
};

const getAllBookings = async ({ carId, date }: TQueryProps) => {
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
