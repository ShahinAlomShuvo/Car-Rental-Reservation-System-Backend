import { z } from "zod";

const bookingValidationSchema = z.object({
  date: z.string().refine(
    (val) => {
      // Validate date format (YYYY-MM-DD)
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    },
    {
      message: "Invalid date format, expected YYYY-MM-DD",
    }
  ),
  car: z.string({
    required_error: "Car reference is required",
  }),
  startTime: z.string().refine(
    (val) => {
      // Validate time format (HH:MM)
      return /^\d{2}:\d{2}$/.test(val);
    },
    {
      message: "Invalid startTime format, expected HH:MM",
    }
  ),
});

export const bookingValidation = {
  bookingValidationSchema,
};
