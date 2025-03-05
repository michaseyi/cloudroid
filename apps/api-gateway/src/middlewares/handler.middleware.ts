import { serverMessages } from "@/constants"
import Logger from "@/utils/logger"
import { ErrorHandler, Handler } from "hono"
import { HTTPException } from "hono/http-exception"
import { ZodError } from "zod"

class HandlerMiddleware {
  static error: ErrorHandler = async (error, c) => {
    Logger.error(error.message)
    
    switch (true) {
      case error instanceof ZodError:
        return c.json({ status: 400, message: error.issues[0]!.message }, 400)
      case error instanceof HTTPException:
        return c.json(
          { status: error.status, message: error.message },
          error.status
        )

      default:
        return c.json(
          { status: 500, message: serverMessages.INTERNAL_SERVER_ERROR },
          500
        )
    }
  }
  static respond: Handler = async (c) => {
    if (!c.locals.status) {
      return c.json({ status: 404, message: serverMessages.NOT_FOUND }, 404)
    }

    return c.json(c.locals, c.locals.status)
  }
}

export { HandlerMiddleware }
