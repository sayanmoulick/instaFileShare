export class AppError extends Error {
  constructor (message, status) {
    super(message)
    this.status = status || 500
    this.name = 'Apperror'
    this.date = new Date()
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
