import express from 'express'
const router = express.Router()

router.get(`/data`, (req, res, next) => {
	res.end('111111111111')
})

export default router
