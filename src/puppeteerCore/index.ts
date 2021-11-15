import { getPageAllUrl } from '@/puppeteerCore/util'
import { init } from '@/puppeteerCore/view/jd'

export async function puppeteerCoreInit() {
	const listUrl = await getPageAllUrl()
	init()
	// console.log('listUrl', listUrl)
}
