// import { mySqlInit } from './mySql'
import { puppeteerCoreInit } from './puppeteerCore'
import { expressInit } from './express'

puppeteerCoreInit()
expressInit()

process.on('unhandledRejection', (reason) => {
	const list = ['_updateClient']
	if (reason) {
		let is = true
		list.forEach((res) => {
			if (reason.toString().includes(res)) {
				is = false
			}
		})
		if (is) {
			console.log('reason', reason)
		}
	}
})
