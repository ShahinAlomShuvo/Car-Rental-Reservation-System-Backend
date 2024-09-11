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

const updateCar = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCar = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const carService = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
