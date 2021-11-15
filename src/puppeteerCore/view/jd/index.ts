import { objectFuzzyQuery } from '@/util/data'
import { getPageUrl } from '@/puppeteerCore/util'

export async function init() {
	const pageData: ObjectMap = await getPageUrl()
	const pageObj = objectFuzzyQuery('search.jd.com/Search', pageData)
	if (!pageObj.length) return
	const pageEvaluate = await pageObj[0].data.evaluate(() => {
		const nav: Element | null = document.querySelector('.crumbs-nav-main.clearfix')
		const goodsList = document.querySelector('#J_goodsList')?.querySelectorAll('.gl-warp.clearfix li')
		console.log('goodsList', goodsList?.length)
	})
	// console.log('pageEvaluate', pageEvaluate)
}
