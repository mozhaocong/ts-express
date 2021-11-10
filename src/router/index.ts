import express from 'express'
import apiFile from '../view/apiFile'
const router = express.Router()

const routerData = {
	apiFile: apiFile
}

for (const i in routerData) {
	router.use(`/${i}`, routerData.apiFile)
}
export default router
