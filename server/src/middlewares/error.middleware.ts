import { NextFunction, Request, Response } from 'express'
import HttpException from '@exceptions/http.exception'

export default function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    try {
        const status: number = error.status || 500
        const message: string = error.message || 'Something went wrong'

        // TODO: log error
        // logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
        res.status(status).json({ message })
    } catch (error) {
        next(error)
    }
}
