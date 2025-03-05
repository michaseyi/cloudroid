import { UserService } from "@/services"
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
    next()
  }

  static get: Handler = async (c) => {
    return c.json({ message: "Hello, World!" })
  }
}

export { UserController }
