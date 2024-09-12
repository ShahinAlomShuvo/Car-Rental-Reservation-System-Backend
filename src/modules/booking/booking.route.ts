import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth.middleware";

const route = Router();

route.post("/", auth("user"), bookingController.bookingACar);

route.get("/", auth("admin"), bookingController.getAllBookings);

export const bookingRoute = route;
