import { Request, Response } from "express";
import { authService } from "./auth.service";
import { userValidation } from "../user/user.validation";

const signUp = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const parsedData = userValidation.userValidationSchema.parse(userData);
    const user = await authService.signUp(parsedData);
    res.status(200).json({
      success: true,
      message: "User signed up successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sign up",
      error: error,
    });
  }
};

export const authController = {
  signUp,
};
