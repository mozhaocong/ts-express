import { objectFuzzyQuery } from '@/util/data'
import { getPageUrl } from '@/puppeteerCore/util'

export async function init() {
	const pageData: ObjectMap = await getPageUrl()
	const pageObj = objectFuzzyQuery('erp-test.rantion', pageData)
	if (!pageObj.length) return
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
		return returnData
	})
	console.log('pageEvaluate', pageEvaluate)
}
