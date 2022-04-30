import HttpError from '../errors/httpError.js'

export default function errorMiddleware(error, req, res, next) {
  if (error instanceof HttpError) {
    const { statusCode, message } = error
    res.status(statusCode).json({ statusCode, message })
    next()
  } else {
    next(error)
  }
}
