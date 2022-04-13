import { getPageAllUrl } from '@/puppeteerCore/util'
import { JDInit } from '@/puppeteerCore/view/jd'
import { init } from '@/puppeteerCore/view/rantion'

export async function puppeteerCoreInit() {
	// const listUrl = await getPageAllUrl()
	// console.log('listUrl', listUrl)
	init()
	// JDInit()
}
