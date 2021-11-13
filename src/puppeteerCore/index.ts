import { get_debug_brrowse } from './init'
import { getPageAllUrl, getPageUrl } from '@/puppeteerCore/util'

export async function puppeteerCoreInit() {
	const browser = await get_debug_brrowse()
	const pageData: ObjectMap = await getPageUrl('http://localhost:3000/console')
	const listUrl = await getPageAllUrl()
	console.log('listUrl', listUrl)
	if (pageData['http://localhost:3000/console']) {
		const name = 2
		const age = 2
		const location = 1
		await pageData['https://www.baidu.com/s?ie=UTF-8&wd=fasfa'].evaluate(
			({ name, age, location }: any) => {
				console.log(document.body.innerText)
			},
			{ name, age, location }
		)
	}
}
