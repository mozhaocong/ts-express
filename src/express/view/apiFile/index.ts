import express from 'express'
const router = express.Router()
import { test } from './components/test'
import { data } from '@/express/view/apiFile/components/data'
router.use((req, res, next) => {
	next()
})

router.get(`/`, (req, res, next) => {
	test(req, res, next)
})

router.get(`/data`, (req, res, next) => {
	data(req, res, next)
})

export default router
