import mongoose, { Schema } from "mongoose";
import { TCar } from "./car.interface";

const CarSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

CarSchema.pre("find", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

CarSchema.pre("findOne", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

CarSchema.pre("findOneAndUpdate", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

CarSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Car = mongoose.model<TCar>("Car", CarSchema);

export default Car;
