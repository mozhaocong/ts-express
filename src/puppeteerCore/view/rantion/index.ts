import { objectFuzzyQuery } from '@/util/data'
import {
	getInnerTextAll,
	getPageAllUrl,
	getPageUrl,
	onConsole,
	onResponse,
	pageAll,
	pageClickAll,
	pcConsole
} from '@/puppeteerCore/util'

export async function init() {
	const pageAllUrl = await getPageAllUrl()
	console.log('browser', pageAllUrl)
	const pageData: ObjectMap = await getPageUrl()
	const pageObj = objectFuzzyQuery('erp-test.rantion', pageData)
	if (!pageObj.length) return
	const that = pageObj[0].data
	onResponse(that)
	// const search = await getInnerTextAll(that, '.ant-layout-sider-children')
	// await pcConsole(that, search)
	// await pageClickAll(that, '.top-search-from .ant-radio-button-wrapper', '物流问题')
	// onConsole(pageObj[0].data, async (item: any) => {
	// 	console.log('jsonValue', await item.jsonValue())
	// })
	// const pageEvaluate = await that.evaluate(() => {
	// 	const antTableContent = document.querySelector('.ant-table-content')
	// 	const returnTr: any[] = []
	// 	if (antTableContent) {
	// 		const trData: NodeListOf<TextElement> = antTableContent.querySelectorAll('.ant-table-row.ant-table-row-level-0')
	// 		trData.forEach((item) => {
	// 			const tr: NodeListOf<TextElement> = item.querySelectorAll('td')
	// 			const list: any[] = []
	// 			tr.forEach((res) => {
	// 				list.push(res.innerText)
	// 			})
	// 			returnTr.push(list)
	// 		})
	// 	}
	// 	return returnTr
	// })
	// await pcConsole(that, pageEvaluate)
}
