import z from "zod"

const validation = {
  create: z.object({
    name: z
      .string({ message: "Name is required." })
      .min(3, "Name must be at least 3 characters.")
      .max(255, "Name cannot exceed 255 characters."),
    email: z
      .string({ message: "Email is required." })
      .email("Invalid email address."),
    password: z
      .string({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters.")
      .max(255, "Password cannot exceed 255 characters."),
  }),

  login: z.object({
    email: z
      .string({ message: "Email is required." })
      .email("Invalid email address."),
    password: z
      .string({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters.")
      .max(255, "Password cannot exceed 255 characters."),
  }),
}

export { validation as UserValidation }
