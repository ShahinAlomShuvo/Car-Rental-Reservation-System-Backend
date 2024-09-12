import { Router } from "express";
import { bookingController } from "./booking.controller";

const route = Router();

route.post("/", bookingController.bookingACar);

export const bookingRoute = route;
