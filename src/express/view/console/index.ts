import express from 'express'
const router = express.Router()

router.get(`/`, (req, res, next) => {
	res.end('<div>4456<span style="color: red">2</span></div>')
})
router.get(`/data`, (req, res, next) => {
	res.end(`<div>346347</div>`)
})

export default router
