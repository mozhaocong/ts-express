import express from 'express'
import lowCode from '../routerModel/lowCode/index'
import createFileApi from '../routerModel/createFileApi'
const router = express.Router()

const routerData: ObjectMap = {
	lowCode: lowCode,
	createFileApi: createFileApi
}

for (const i in routerData) {
	router.use(`/${i}`, routerData[i])
}
export default router
