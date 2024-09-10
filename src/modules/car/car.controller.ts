import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import { carService } from "./car.service";
import { carValidation } from "./car.validation";

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
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: cars,
  });
});

export const carController = {
  createCar,
  getAllCars,
};
