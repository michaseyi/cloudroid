import { ServiceFailure, ServiceSuccess } from "@/types"

function success<T>(message: string, data?: T): ServiceSuccess<T> {
  return { ok: true, message, data }
}

function failure<T>(message: string, type?: T): ServiceFailure<T> {
  return { ok: false, message, type }
}

export { success, failure }
