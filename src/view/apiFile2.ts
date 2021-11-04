import express from 'express'
const router = express.Router()

router.use((req, res, next) => {
    console.log(`路由执行成功啦~~~`, Date.now());
    next()
})


router.get(`/`, (req, res, next) => {
    res.json({
        status: 200,
        data: `请求成功`
    })
})


router.get(`/data1`, (req, res, next) => {
    res.json({
        status: 200,
        data: [23]
    })
})

export default router
