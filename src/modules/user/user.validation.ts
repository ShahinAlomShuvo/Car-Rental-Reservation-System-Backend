import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["user", "admin"], "Role must be 'user' or 'admin'"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(10, "Phone number must be valid"),
  address: z.string().min(1, "Address is required"),
});

export const userValidation = {
  userValidationSchema,
};
