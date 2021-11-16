import { Request, Response, NextFunction } from 'express'
import { getPageAllUrl } from '@/puppeteerCore/util'

export async function data(req: Request, res: Response, next: NextFunction) {
	const pageAllUrl = await getPageAllUrl()
	console.log('pageAllUrl', pageAllUrl)
	res.end(pageAllUrl.toString())
}
