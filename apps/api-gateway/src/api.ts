import { Hono } from "hono"
import { AuthRouter, InstanceRouter, UserRouter } from "@/routes"
import { HandlerMiddleware } from "@/middlewares"

const api = new Hono().basePath("/api/v1")

api.onError(HandlerMiddleware.error)
api.route("/users", UserRouter)
api.route("/instances", InstanceRouter)
api.route("/auth", AuthRouter)
api.use(HandlerMiddleware.respond)

export default api
