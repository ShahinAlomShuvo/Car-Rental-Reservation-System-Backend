import noDataFound from "../../utils/noDataFound.utils";
import { TCar } from "./car.interface";
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

export const carService = {
  createCar,
  getAllCars,
  getCarById,
};
