import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import { carService } from "./car.service";
import noDataFound from "../../utils/noDataFound.utils";

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;
  const car = await carService.createCar(carData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Car created successfully",
    data: car,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const cars = await carService.getAllCars();
  if (!cars) {
    noDataFound(res, "Data not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: cars,
  });
});

const getCarById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const car = await carService.getCarById(id);
  if (!car) {
    noDataFound(res, "Data not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car retrieved successfully",
    data: car,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const carData = req.body;

  const result = await carService.updateCar(id, carData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await carService.deleteCar(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car deleted successfully",
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const data = req.body;

  const booking = await carService.returnCar(data);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car returned successfully",
    data: booking,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  returnCar,
};
