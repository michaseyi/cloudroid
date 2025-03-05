import { Hono } from "hono"

const router = new Hono()

router.get("/")

router.get("/:id")

router.post("/")

router.patch("/:id")

router.delete("/:id")

export { router as InstanceRouter }
