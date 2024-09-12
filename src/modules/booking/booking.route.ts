import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth.middleware";

const route = Router();

route.post("/", auth("user"), bookingController.bookingACar);

route.get("/", auth("admin"), bookingController.getAllBookings);

route.get("/my-bookings", auth("user"), bookingController.myBookings);

export const bookingRoute = route;
