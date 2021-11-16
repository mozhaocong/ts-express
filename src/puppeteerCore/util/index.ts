import { get_debug_brrowse } from './init'
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
	if (!Object.keys(pageAllData).length) {
		browser = await get_debug_brrowse()
		pageAll = await browser.pages()
		for (const i of pageAll) {
			pageAllData[i.mainFrame().url()] = i
		}
	}
	return !key ? pageAllData : pageAllData[key] || {}
}

export const onConsole: (item: any, cd?: (msg: any) => void) => void = (page: any, callback) => {
	if (!page.on) return
	page.on('console', async (msg: any) => {
		for (let i = 0; i < msg.args().length; ++i) {
			console.log('console', msg.args()[i].toString())
			callback?.(msg.args()[i])
		}
	})
}

export const getInnerTextAll = async (page: any, key: string): Promise<string[] | []> => {
	if (!page.$$eval) {
		console.log('page对象为空')
		return []
	}
	return await page.$$eval(key, (eles: Array<any>) => eles.map((ele) => ele.innerText))
}
export const getInnerText = async (page: any, key: string): Promise<string> => {
	if (!page.$$eval) {
		console.log('page对象为空')
		return ''
	}
	return await page.$eval(key, (ele: any) => ele.innerText)
}

export const pageClick = async (page: any, dom: string): Promise<boolean> => {
	if (!page.$$eval) {
		console.log('page对象为空')
		return false
	}
	const clickDom = page.$(dom)
	if (clickDom) {
		await clickDom.click()
		return true
	} else {
		console.log('page目标对象为空')
		return false
	}
}

export const pageClickAll = async (page: any, dom: string, value: string | number): Promise<boolean> => {
	if (!page.$$eval) {
		console.log('page对象为空')
		return false
	}
	const clickDom = await page.evaluate(
		(data: ObjectMap) => {
			console.log('data', data)
			const domAll = document.querySelectorAll(data.dom)
			if (!domAll.length) {
				console.log('page目标对象为空')
				return false
			}
			if (typeof data.value === 'string') {
				let nub = null
				domAll.forEach((res, index) => {
					if (res.innerText === data.value) {
						nub = index
					}
				})
				if (nub === null) {
					console.log('page目标对象对比不上')
					return false
				} else {
					domAll[nub].click()
					return true
				}
			} else {
				domAll[data.value].click()
				return true
			}
		},
		{ dom: dom, value: value }
	)
	return clickDom
}

export async function pcConsole(page: any, data: any) {
	if (!page.evaluate) {
		console.log('page对象为空')
		return false
	}
	await page.evaluate(
		(data: any) => {
			console.log(data.data)
		},
		{ data: data }
	)
}
