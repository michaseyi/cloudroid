import { ContextUser } from "@/types"
import type { Context } from "hono"
import { ContentfulStatusCode } from "hono/utils/http-status"

declare module "hono" {
  interface Context {
    locals: {
      status?: ContentfulStatusCode
      message?: string
      data?: any
    } & Record<string, any>

    user: ContextUser
  }
}
