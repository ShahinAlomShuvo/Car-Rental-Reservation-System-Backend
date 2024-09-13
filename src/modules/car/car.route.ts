import { Router } from "express";
import { carController } from "./car.controller";
import auth from "../../middleware/auth.middleware";
import validateRequest from "../../middleware/validation.middleware";
import { carValidation } from "./car.validation";

const route = Router();

route.post(
  "/",
  validateRequest(carValidation.createCarValidationSchema),
  auth("admin"),
  carController.createCar
);

route.get("/", carController.getAllCars);

route.get("/:id", carController.getCarById);

route.put(
  "/return",
  validateRequest(carValidation.returnCarValidationSchema),
  auth("admin"),
  carController.returnCar
);
route.put(
  "/:id",
  validateRequest(carValidation.updateCarValidationSchema),
  auth("admin"),
  carController.updateCar
);

route.delete("/:id", auth("admin"), carController.deleteCar);

export const carRoute = route;
