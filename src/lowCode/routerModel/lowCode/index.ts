import express from 'express'
import { defaultResJson } from '@/express'
import generationCode from './model/generationCode'
const router = express.Router()

// router.all('/*', (req, res, next) => {
// 	console.log(req.query)
// 	console.log(req.params)
// 	// console.log(res)
// 	next()
// })

router.post(`/generationCode`, (req, res, next) => {
	const data = generationCode(req.body)
	res.json(defaultResJson({ data: data }))
})

export default router
