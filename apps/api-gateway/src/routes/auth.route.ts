import { AuthController } from "@/controllers"
import { Hono } from "hono"

const router = new Hono()

router.post("/login", AuthController.login)

export { router as AuthRouter }
