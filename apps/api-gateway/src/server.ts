import api from "@/api"
import { serve } from "@hono/node-server"
import { config } from "@/conf"

serve({
  fetch: api.fetch,
  port: config.PORT,
})
