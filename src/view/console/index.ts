import express from 'express'
const router = express.Router()
import { consoleData } from '@/util'

router.get(`/`, (req, res, next) => {
	res.end('<div>4456<span style="color: red">2</span></div>')
})
router.get(`/data`, (req, res, next) => {
	res.end(JSON.stringify(consoleData))
})

export default router
