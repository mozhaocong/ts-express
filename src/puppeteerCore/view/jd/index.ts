import { objectFuzzyQuery } from '@/util/data'
import { getInnerTextAll, getPageUrl, onResponse, pageClickAll, pcConsole } from '@/puppeteerCore/util'

export async function JDInit() {
	const pageData: ObjectMap = await getPageUrl()
	const pageObj = objectFuzzyQuery('search.jd.com/search', pageData)
	if (!pageObj.length) return
	console.log('pageObj', pageObj)
	const that = pageObj[0].data
	const data = await getInnerTextAll(that, '#J_goodsList .gl-item .p-price')
	const emData = await getInnerTextAll(that, '#J_goodsList .gl-item .p-name em')
	await onResponse(that)
	await pcConsole(that, data)
	await pcConsole(that, emData)
	// await pageClickAll(that, '#J_filter .f-sort .fs-tit', '销量')
	// console.log('pageEvaluate', pageEvaluate)
}
