import { UserService } from "@/services"
import Logger from "@/utils/logger"
import { UserValidation } from "@/validations"
import type { Handler } from "hono"
import { HTTPException } from "hono/http-exception"

class UserController {
  static create: Handler = async (c, next) => {
    const reqBody = await c.req.json()
    const userCreateInfo = UserValidation.create.parse(reqBody)
    const result = await UserService.create({}, userCreateInfo)
    if (result.ok) {
      c.locals = { message: result.message, data: result.data, status: 201 }
    } else {
      throw new HTTPException(400, { message: result.message })
    }
    await next()
  }

  static get: Handler = async (c, next) => {
    const user = c.user
    const result = await UserService.get({}, { id: user.id })
    if (result.ok) {
      c.locals = { message: result.message, data: result.data, status: 200 }
    } else {
      throw new HTTPException(400, { message: result.message })
    }
    await next()
  }
}

export { UserController }
