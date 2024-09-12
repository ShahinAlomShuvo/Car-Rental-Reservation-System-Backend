import { Response } from "express";
import httpStatus from "http-status";

const unauthorizeResponse = (res: Response) => {
  const statusCode = httpStatus.UNAUTHORIZED;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: "You have no access to this route",
  });
};

export default unauthorizeResponse;
