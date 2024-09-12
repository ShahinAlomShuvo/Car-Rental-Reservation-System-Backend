import { carService } from "../car/car.service";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const bookingACar = async (data: TBooking) => {
  const carId = data.car.toString();
  const isCarAvailable = carService.availableCar(carId);
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

export const bookingService = {
  bookingACar,
};
