export default class HttpError extends Error {
  statusCode

  constructor(message = 'something went wrong', statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}
