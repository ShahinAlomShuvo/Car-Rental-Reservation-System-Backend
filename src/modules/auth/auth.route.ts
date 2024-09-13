import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validation.middleware";
import { userValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  authController.signUp
);

router.post("/signin", authController.signIn);

export const authRoute = router;
