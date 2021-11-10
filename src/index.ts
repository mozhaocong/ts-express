import express, { Express, Request, Response, NextFunction } from 'express'
import router from './router/index'
import { mySqlInit } from './MySql/index'

const PORT = 3000
const app: Express = express()

mySqlInit()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.json({
		code: 0,
		message: 'success'
	})
})

app.use('/', router)

app.listen(PORT, () => {
	console.log(`服务已经启动:localhost:${PORT}`)
})
