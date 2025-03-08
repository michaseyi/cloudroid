import prisma from "@/prisma"
import { AuthTokenPayload, Service } from "@/types"
import { failure } from "@/utils/response"
import { InstanceValidation } from "@/validations"
import { z } from "zod"

class InstanceService {
  static create: Service<z.infer<typeof InstanceValidation.create>> = async (
    ctx,
    params
  ) => {
    const androidInstance = await prisma.androidInstance.create({
      data: {
        name: "",
        userId: "",
      },
    })

    return failure("Not implemented")
  }
}

export { InstanceService }
