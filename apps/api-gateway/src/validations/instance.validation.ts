import z from "zod"

const validation = {
  create: z.object({
    name: z
      .string({ message: "Name is required." })
      .min(3, "Name must be at least 3 characters.")
      .max(255, "Name cannot exceed 255 characters."),
  }),
}

export { validation as InstanceValidation }
