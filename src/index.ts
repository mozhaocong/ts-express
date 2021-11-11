import express, { Express, Request, Response, NextFunction } from 'express'
import router from './router/index'
import { mySqlInit } from './mySql'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import { get_debug_brrowse } from './puppeteerCore'
import './typeTs/index'
import cors from 'cors'

async function browserInit() {
	const browser = await get_debug_brrowse()
	const page = await browser.newPage()
	await page.goto('https://www.cnblogs.com/')
}
browserInit()

const PORT = 3000
const app: Express = express()

// mySqlInit()

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

app.use('/', router)

app.listen(PORT, () => {
	console.log(`服务已经启动:http://localhost:${PORT}`)
})
