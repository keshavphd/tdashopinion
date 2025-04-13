import { z } from "zod";

export const loginSchema = z.object({

  email: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),

  password: z.string().min(1, { message: "Field is required" }),
  
});
