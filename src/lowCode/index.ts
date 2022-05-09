import { expressInit } from '@/express'
import router from '@/lowCode/router'

export function lowCodeInit() {
	expressInit(router)
}
