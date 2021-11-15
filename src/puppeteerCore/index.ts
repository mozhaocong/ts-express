import { get_debug_brrowse } from './init'
import { getPageAllUrl, getPageUrl } from '@/puppeteerCore/util'
import { objectFuzzyQuery } from '@/util/data'
interface TextElement extends Element {
	innerText: string
}
export async function puppeteerCoreInit() {
	// const browser = await get_debug_brrowse()
	const pageData: ObjectMap = await getPageUrl()
	const listUrl = await getPageAllUrl()
	const pageObj = objectFuzzyQuery('erp-test.rantion', pageData)
	console.log('listUrl', listUrl)

	const pageEvaluate = await pageObj[0].data.evaluate(() => {
		const antTableContent = document.querySelector('.ant-table-content')
		const returnData: string[] = []
		const returnTr: any[] = []
		if (antTableContent) {
			const thData: NodeListOf<TextElement> = antTableContent.querySelectorAll(
				'.ant-table-align-center.ant-table-row-cell-break-word'
			)
			thData.forEach((item) => {
				returnData.push(item.innerText)
			})
			const trData: NodeListOf<TextElement> = antTableContent.querySelectorAll('.ant-table-row.ant-table-row-level-0')
			trData.forEach((item) => {
				const tr: NodeListOf<TextElement> = item.querySelectorAll('td')
				const list: any[] = []
				tr.forEach((res) => {
					list.push(res.innerText)
				})
				returnTr.push(list)
			})
		}
		console.log(returnTr)
		return returnData
	})
	console.log('pageEvaluate', pageEvaluate)
}
