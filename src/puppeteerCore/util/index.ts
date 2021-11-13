import { get_debug_brrowse } from '../init'
let browser = null
export const pageAllData: ObjectMap = {}
export let pageAll: any = null
export const pageAllUrl: any[] = []
export async function getPageAllUrl() {
	if (pageAllUrl.length) {
		return pageAllUrl
	} else {
		browser = await get_debug_brrowse()
		pageAll = await browser.pages()
		for (const i of pageAll) {
			pageAllUrl.push(i.mainFrame().url())
		}
		return pageAllUrl
	}
}
export async function getPageUrl(key: string) {
	if (!pageAll) {
		browser = await get_debug_brrowse()
		pageAll = await browser.pages()
		for (const i of pageAll) {
			pageAllData[i.mainFrame().url()] = i.mainFrame()
		}
	}
	return pageAllData[key] || {}
}
