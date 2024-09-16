/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import comparePassword from "../../utils/comparePassword.utils";
import { TSignIn, TUser } from "../user/user.interface";
import User from "../user/user.model";
import jwt from "jsonwebtoken";

const signUp = async (user: TUser) => {
  const isExist = await existingUser(user.email);
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }
  const newUser = await User.create(user);
  const result = await User.findById(newUser._id).select("-password");
  return result;
};

const existingUser = async (email: string) => {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

const signIn = async (payload: TSignIn) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  const isMatch = comparePassword(payload.password, existingUser.password);
  if (!isMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  const { password, ...jwtPayload } = existingUser.toJSON();

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expire_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expire_in,
    }
  );

  return { user: jwtPayload, accessToken, refreshToken };
};

export const authService = {
  signUp,
  signIn,
  existingUser,
};
