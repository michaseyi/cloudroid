import { config } from "@/conf"
import { serverMessages } from "@/constants"
import { AuthTokenPayload } from "@/types"
import { decryptJwt } from "@/utils/encryption"
import { Handler } from "hono"
import { HTTPException } from "hono/http-exception"

class AuthMiddleware {
  static isAuthenticated: Handler = async (c, next) => {
    const authorization = c.req.header("Authorization")
    if (typeof authorization !== "string") {
      throw new HTTPException(401, {
        message: serverMessages.UNAUTHENTICATED,
      })
    }
    const payload = decryptJwt<AuthTokenPayload>(
      authorization,
      config.JWT_AUTH_TOKEN
    )
    if (!payload || payload.type !== "auth") {
      throw new HTTPException(401, {
        message: serverMessages.UNAUTHENTICATED,
      })
    }
    c.user = payload.data
    next()
  }
}

export { AuthMiddleware }
