import { Request } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

const authData = (req: Request) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ")[1];
    const verify = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );
    const data = verify as jwt.JwtPayload;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default authData;
