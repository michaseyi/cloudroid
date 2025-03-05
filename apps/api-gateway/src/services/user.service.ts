import { AuthTokenPayload, Service } from "@/types"
import { failure, success } from "@/utils/response"
import { UserValidation } from "@/validations"
import { z } from "zod"
import prisma from "@/prisma"
import { encryptJwt, hashString, verifyHashedInput } from "@/utils/encryption"
import { serverMessages } from "@/constants"
import { config } from "@/conf"

class UserService {
  static create: Service<
    z.infer<typeof UserValidation.create>,
    Omit<z.infer<typeof UserValidation.create>, "password">
  > = async (ctx, params) => {
    const { email, name, password } = params

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return failure(serverMessages.USER_EXISTS)
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashString(password),
        name,
      },
    })

    return success("User created", user)
  }

  static authenticate: Service<
    {
      email: string
      password: string
    },
    string
  > = async (ctx, params) => {
    const { email, password } = params
    const user = await prisma.user.findUnique({
      where: { email },
      omit: { password: false },
    })
    if (!user) {
      return failure(serverMessages.AUTHENTICATION_FAILED)
    }
    const isPasswordValid = verifyHashedInput(password, user.password)
    if (!isPasswordValid) {
      return failure(serverMessages.AUTHENTICATION_FAILED)
    }
    const authTokenPayload: AuthTokenPayload = {
      type: "auth",
      data: { id: user.id },
    }
    const authToken = encryptJwt(
      authTokenPayload,
      config.JWT_AUTH_TOKEN,
      config.JWT_AUTH_TOKEN_EXPIRY
    )
    return success(serverMessages.USER_AUTHENTICATED, authToken)
  }

  static get: Service<{ id: string }> = async (c, params) => {
    const { id } = params
    const user = await prisma.user.findUnique({ where: { id } })

    if (user) {
      return success("User found", user)
    } else {
      return failure(serverMessages.USER_NOT_FOUND)
    }
  }
}

export { UserService }
