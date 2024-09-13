import { authService } from "./auth.service";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import httpStatus from "http-status";
import config from "../../config";

const signUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const user = await authService.signUp(userData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

const signIn = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await authService.signIn(userData);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result.user,
    token: result.accessToken,
  });
});

export const authController = {
  signUp,
  signIn,
};
