import express from 'express'
import apiFile from '../view/apiFile/index'
import console from '@/view/console/index'
const router = express.Router()

const routerData: ObjectMap = {
	apiFile: apiFile,
	console: console
}

for (const i in routerData) {
	router.use(`/${i}`, routerData[i])
}
export default router
