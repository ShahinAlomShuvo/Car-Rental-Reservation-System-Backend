import { TUser } from "../user/user.interface";
import User from "../user/user.model";

const signUp = async (user: TUser) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = await User.create(user);
  const result = await User.findById(newUser._id).select("-password");
  return result;
};

export const authService = {
  signUp,
};
