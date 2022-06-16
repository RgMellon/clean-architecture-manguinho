export type HttpRequest = {
  url: string
  headers?: any
  method: HttpMethod
  body?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'get'

export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  serverError = 500,
  notFound = 404,
  forbiden = 403,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
