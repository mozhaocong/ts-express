// import { mySqlInit } from './mySql'
import { puppeteerCoreInit } from './puppeteerCore'
import { expressInit } from './express'
import { main } from './main'
// import { lowCodeInit } from '@/lowCode'
// main()
// puppeteerCoreInit()
// expressInit()

// lowCodeInit()

// process.on('unhandledRejection', (reason) => {
// 	const list = ['_updateClient', '_client']
// 	if (reason) {
// 		let is = true
// 		list.forEach((res) => {
// 			if (reason.toString().includes(res)) {
// 				is = false
// 			}
// 		})
// 		if (is) {
// 			console.log('reason', reason)
// 		}
// 	}
// })

import './lowCode/generationCode'
