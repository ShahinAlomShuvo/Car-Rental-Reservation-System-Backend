import { Router } from "express";
import { carController } from "./car.controller";
import auth from "../../middleware/auth.middleware";

const route = Router();

route.post("/", auth("admin"), carController.createCar);

route.get("/", carController.getAllCars);

route.get("/:id", carController.getCarById);

export const carRoute = route;
