import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth.middleware";
import validateRequest from "../../middleware/validation.middleware";
import { bookingValidation } from "./booking.validation";

const route = Router();

route.post(
  "/",
  validateRequest(bookingValidation.bookingValidationSchema),
  auth("user"),
  bookingController.bookingACar
);

route.get("/", auth("admin"), bookingController.getAllBookings);

route.get("/my-bookings", auth("user"), bookingController.myBookings);

export const bookingRoute = route;
