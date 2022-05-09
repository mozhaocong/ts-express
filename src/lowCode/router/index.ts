import express from 'express'
import lowCode from '../routerModel/lowCode/index'
const router = express.Router()

const routerData: ObjectMap = {
	lowCode: lowCode
}

for (const i in routerData) {
	router.use(`/${i}`, routerData[i])
}
export default router
