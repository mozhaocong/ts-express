import { Request, Response, NextFunction } from 'express'

export async function data(req: Request, res: Response, next: NextFunction) {
	console.log('pageAllUrl', pageAllUrl)
	res.end(pageAllUrl.toString())
}
