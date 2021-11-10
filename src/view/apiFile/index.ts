import express from 'express'
const router = express.Router()
const datagasga: ObjectMap = { 1: 0 }
import { test } from './components/test'

router.use((req, res, next) => {
	next()
})

router.get(`/`, (req, res, next) => {
	test(req, res, next)
	// res.json({
	// 	status: 200,
	// 	data: `apiFile`
	// })
})

router.get(`/data`, (req, res, next) => {
	res.json({
		status: 200,
		data: [1, 2, 3, 4, 5, 6, 7]
	})
})

export default router
