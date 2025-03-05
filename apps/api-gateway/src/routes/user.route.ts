import { UserController } from "@/controllers"
import { AuthMiddleware } from "@/middlewares/auth.middleware"
import { Hono } from "hono"

const router = new Hono()

router.post("/", UserController.create)

router.get("/me", AuthMiddleware.isAuthenticated, UserController.get)

router.patch("/me")

router.delete("/me")

export { router as UserRouter }
