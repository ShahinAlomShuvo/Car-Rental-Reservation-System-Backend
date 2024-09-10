import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import { carService } from "./car.service";
import { carValidation } from "./car.validation";
import noDataFound from "../../utils/noDataFound.utils";

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;
  const parsedData = carValidation.createCarValidationSchema.parse(carData);
  const car = await carService.createCar(parsedData);
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
  const parsedData = carValidation.updateCarValidationSchema.parse(carData);
  const car = await carService.getCarById(id);
  if (!car) {
    noDataFound(res, "Data not found");
  }

  const result = await carService.updateCar(id, parsedData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
};
