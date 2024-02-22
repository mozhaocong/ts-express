import express from 'express'
import { defaultResJson } from '@/express'
import { init } from '@/createFile'

const router = express.Router()

router.post(`/`, (req, res, next) => {
	init(req.body)
	res.json(defaultResJson({ data: 1 }))
})

export default router
