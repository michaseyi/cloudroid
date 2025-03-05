import { UserService } from "@/services"
import { UserValidation } from "@/validations"
import type { Handler } from "hono"
import { HTTPException } from "hono/http-exception"

class AuthController {
  static login: Handler = async (c, next) => {
    const reqBody = await c.req.json()
    const loginInfo = UserValidation.login.parse(reqBody)
    const result = await UserService.authenticate({}, loginInfo)
    if (result.ok) {
      c.header("Authorization", result.data)
      c.locals = { message: result.message, status: 200 }
    } else {
      throw new HTTPException(400, { message: result.message })
    }
    next()
  }

  static getMe: Handler = async (c) => {
    return c.json({ message: "Hello, World!" })
  }
}

export { AuthController }
