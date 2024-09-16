import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import Booking from "../booking/booking.model";
import { convertTimeToHours } from "./car.constant";
import { TCar, TReturnCar } from "./car.interface";
import Car from "./car.model";

const createCar = async (payload: TCar) => {
  const car = await Car.create(payload);
  return car;
};

const getAllCars = async () => {
  const cars = await Car.find();
  return cars;
};

const getCarById = async (id: string) => {
  const car = await Car.findById(id);
  return car;
};

const updateCar = async (id: string, payload: Partial<TCar>) => {
  const isExist = await getCarById(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car not found for update");
  }

  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCar = async (id: string) => {
  const isExist = await getCarById(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
  }

  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const returnCar = async (data: TReturnCar) => {
  const session = await Booking.startSession();
  const booking = await Booking.findById(data.bookingId);
  if (!booking) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No booking available with this id for return car"
    );
  }

  const startTime = convertTimeToHours(booking.startTime);
  const endTime = convertTimeToHours(data.endTime);
  const duration = endTime - startTime;
  const car = await getCarById(booking?.car.toString());
  if (!car) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
  }
  if (car.status !== "unavailable") {
    throw new AppError(httpStatus.BAD_REQUEST, "Car is not booked");
  }

  const totalCost = duration * car.pricePerHour;

  try {
    session.startTransaction();
    await Booking.findByIdAndUpdate(
      data.bookingId,
      {
        endTime: data.endTime,
        totalCost,
      },
      {
        new: true,
        session,
      }
    );

    await Car.findByIdAndUpdate(
      booking?.car.toString(),
      {
        status: "available",
      },
      {
        new: true,
        session,
      }
    );

    session.commitTransaction();
    const result = Booking.findById(data.bookingId)
      .populate("car")
      .populate({ path: "user", select: "-password" });

    return result;
  } catch (error) {
    await session.abortTransaction();
  }
};

const availableCar = async (id: string) => {
  const result = await Car.findOne({ _id: id, status: "available" });
  return result;
};

export const carService = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  availableCar,
  returnCar,
};
