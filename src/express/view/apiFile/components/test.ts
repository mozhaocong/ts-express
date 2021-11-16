// import { Request, Response, NextFunction } from 'express'
import { expressMethod } from '@/typeTs'
import { mySqlConnection } from '@/mySql'

// export function dssd(req: Request, res: Response, next: NextFunction) {
// 	res.json({
// 		status: 200,
// 		data: `apiFileTest`
// 	})
// }

export function test(...[req, res, next]: expressMethod) {
	mySqlConnection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
		if (error) {
			console.log(error)
			return
		}
	})
	mySqlConnection.query('show full processlist', function (error, results) {
		console.log('results', results)
	})
	res.json({
		status: 200,
		data: `apiFileTest`
	})
}
