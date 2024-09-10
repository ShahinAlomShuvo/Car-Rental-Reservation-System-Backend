import { authService } from "./auth.service";
import { userValidation } from "../user/user.validation";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import httpStatus from "http-status";

const signUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const parsedData = userValidation.userValidationSchema.parse(userData);
  const user = await authService.signUp(parsedData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

export const authController = {
  signUp,
};
