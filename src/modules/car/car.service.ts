import { TCar } from "./car.interface";
import Car from "./car.model";

const createCar = async (payload: TCar) => {
  const car = await Car.create(payload);
  return car;
};

export const carService = {
  createCar,
};
