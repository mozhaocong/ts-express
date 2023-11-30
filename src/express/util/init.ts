import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import '@/typeTs/index'
import cors from 'cors'
import * as core from 'express-serve-static-core'

const PORT = 3080
const app: Express = express()

export function expressInit(router?: core.Router) {
	//开启 cors
	app.use(cors())
	//支持  application/json类型 发送数据
	app.use(json())
	// 支持 application/x-www-form-urlencoded 发送数据
	app.use(urlencoded({ extended: false }))
	//日志中间件
	app.use(morgan('dev'))
	app.get('/', (req: Request, res: Response, next: NextFunction) => {
		res.json({
			code: 0,
			message: 'success'
		})
	})
	console.log('router', router)

	if (router) {
		app.use('/', router)
	}

	app.listen(PORT, () => {
		console.log(`服务已经启动:http://localhost:${PORT}`)
	})
}
