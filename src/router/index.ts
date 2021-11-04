import express from 'express'
const router = express.Router()
const app = express()
import apiFile from '../view/apiFile'


const routerData = {
    apiFile: apiFile
}

for(let i in routerData) {
    router.use(`/${i}`,routerData.apiFile)
}
export default router
