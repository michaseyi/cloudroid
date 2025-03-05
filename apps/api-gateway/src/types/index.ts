export type ServiceContext = {}

export type ServiceSuccess<T> = {
  ok: true
  message: string
  data?: T
}

export type ServiceFailure<T> = {
  ok: false
  message: string
  type?: T
}

export type Service<
  Params = {},
  SuccessReturn = unknown,
  FailureReturn = unknown,
  Context = ServiceContext,
> = (
  ctx: Context,
  params: Params
) => Promise<ServiceSuccess<SuccessReturn> | ServiceFailure<FailureReturn>>

export type ContextUser = {
  id: string
}

export type AuthTokenPayload = {
  type: "auth"
  data: ContextUser
}
