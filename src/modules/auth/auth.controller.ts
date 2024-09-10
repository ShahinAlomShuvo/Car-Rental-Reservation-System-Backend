import { authService } from "./auth.service";
import { userValidation } from "../user/user.validation";
import catchAsync from "../../utils/catchAsync.utils";

const signUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const parsedData = userValidation.userValidationSchema.parse(userData);
  const user = await authService.signUp(parsedData);
  res.status(201).json({
    status: "success",
    data: user,
  });
});

export const authController = {
  signUp,
};
