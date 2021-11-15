import { get_debug_brrowse } from '../init'
let browser = null
export const pageAllData: ObjectMap = {}
export let pageAll: any = null
export const pageAllUrl: string[] = []
export const getPageAllUrl: () => Promise<string[]> = async () => {
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
export const getPageUrl: (key?: string) => Promise<ObjectMap<string, ObjectMap>> = async (key?: string) => {
	if (!pageAll) {
		browser = await get_debug_brrowse()
		pageAll = await browser.pages()
		for (const i of pageAll) {
			pageAllData[i.mainFrame().url()] = i.mainFrame()
		}
	}
	return !key ? pageAllData : pageAllData[key] || {}
}
