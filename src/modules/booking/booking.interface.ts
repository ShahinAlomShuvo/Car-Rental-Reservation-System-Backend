import { Types } from "mongoose";

export type TBooking = {
  date: Date;
  user?: Types.ObjectId | string;
  car: Types.ObjectId | string;
  startTime: string;
  endTime?: string;
  totalCost?: number;
};

export type TQuery = {
  car?: string;
  date?: Date;
};

export type TQueryProps = {
  carId?: string;
  date?: Date;
};
