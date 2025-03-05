import { createHash, randomBytes, timingSafeEqual } from "crypto"
import jwt from "jsonwebtoken"

const SALT_LENGTH = 32

function hashString(input: string): string {
  const salt = randomBytes(16).toString("hex")

  const hash = createHash("sha256")
    .update(input + salt)
    .digest("hex")

  return salt + hash
}

function verifyHashedInput(input: string, hashedInput: string): boolean {
  try {
    const salt = hashedInput.slice(0, SALT_LENGTH)
    const hash = hashedInput.slice(SALT_LENGTH)

    const inputHash = createHash("sha256")
      .update(input + salt)
      .digest("hex")

    return timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(inputHash, "hex")
    )
  } catch (error) {
    return false
  }
}

function encryptJwt(payload: any, secret: string, expiresIn: number) {
  return jwt.sign({ payload }, secret, { expiresIn })
}

function decryptJwt<T>(token: string, secret: string): T | null {
  try {
    const result = jwt.verify(token, secret)

    if (!(result as any).payload) {
      return null
    }
    return (result as any).payload as T
  } catch (error) {
    return null
  }
}

export { hashString, verifyHashedInput, encryptJwt, decryptJwt }
