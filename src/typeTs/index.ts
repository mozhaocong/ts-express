import { Request, Response, NextFunction } from 'express'
// export type expressMethod = (req: Request, res: Response, next?: NextFunction) => void
export type expressMethod = [Request, Response, NextFunction?]
declare global {}
