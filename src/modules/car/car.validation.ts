import { z } from "zod";

const createCarValidationSchema = z.object({
  name: z.string().min(1, "Car name is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  isElectric: z.boolean(),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  pricePerHour: z.number().positive("Price per hour must be a positive number"),
});

const updateCarValidationSchema = createCarValidationSchema.partial();

const returnCarValidationSchema = z.object({
  bookingId: z.string({
    required_error: "Booking reference is required",
  }),
  endTime: z.string().refine(
    (val) => {
      // Validate time format (HH:MM)
      return /^\d{2}:\d{2}$/.test(val);
    },
    {
      message: "Invalid endTime format, expected HH:MM",
    }
  ),
});

export const carValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
