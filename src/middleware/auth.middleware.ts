import config from "../config";
import { authService } from "../modules/auth/auth.service";
import catchAsync from "../utils/catchAsync.utils";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (requiredRole: string) => {
  return catchAsync(async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new Error("You have no access to this route");
    }
    const token = bearerToken?.split(" ")[1];
    const verify = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verify as JwtPayload;
    if (role !== requiredRole) {
      throw new Error("You have no access to this route");
    }
    const user = await authService.existingUser(email);
    if (!user) {
      throw new Error("You have no access to this route");
    }
    if (requiredRole !== user.role) {
      throw new Error("You have no access to this route");
    }
    next();
  });
};

export default auth;
