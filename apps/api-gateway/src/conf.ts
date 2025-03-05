import dotenv from "dotenv"

dotenv.config()

export const config = {
  PORT: 3000,
  JWT_AUTH_TOKEN: "auth-token",
  JWT_AUTH_TOKEN_EXPIRY: 1000 * 60 * 60 * 5, // 5 hours
  ENV: 'development'
}
