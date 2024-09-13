import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import { bookingService } from "./booking.service";
import authData from "../../utils/getDataFromToken.utils";
import noDataFound from "../../utils/noDataFound.utils";

const bookingACar = catchAsync(async (req, res) => {
  const data = req.body;
  const userData = authData(req);
  const userId = userData?._id;
  const bookingData = {
    ...data,
    user: userId,
    date: new Date(data.date),
  };
  const booking = await bookingService.bookingACar(bookingData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query;
  const bookings = await bookingService.getAllBookings({ carId, date });
  if (!bookings.length) {
    noDataFound(res, "Data not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const myBookings = catchAsync(async (req, res) => {
  const userData = authData(req);
  const userId = userData?._id;
  const bookings = await bookingService.myBookings(userId);
  if (!bookings.length) {
    noDataFound(res, "Data not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Bookings retrieved successfully",
    data: bookings,
  });
});

export const bookingController = {
  bookingACar,
  getAllBookings,
  myBookings,
};
