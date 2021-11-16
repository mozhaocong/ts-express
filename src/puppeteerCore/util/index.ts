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

export function onResponse(page: any) {
	if (!page.on) {
		console.log('page对象为空')
		return false
	}
	page.on('response', async (response: any) => {
		// console.log(response.url()) // 显示响应的 URL，字符串
		// console.log(response.headers()) // 显示响应的header对象
		// console.log(response.text()) // 显示响应的body，Promise
		// console.log(response.status()) // 显示响应的状态码，数值型
		// console.log(response.ok()) // 显示响应是否成功，布尔值
		// console.log(response.request()) // 显示响应对应的 request 对象
		// const data = await responseHandle(response)
		// pcConsole(page, stringify(response.request().method()))
		// console.log('global', global.stringify(response))
		if (response.request().resourceType() === 'xhr') {
			console.log('global', await response.url())
		}
	})
}
const responseHandle = async (response: any) => {
	if (response.request()._resourceType === 'xhr') {
		console.log(response.url())
		// console.log(response.headers())// response 对象 的headers
		// console.log(response.request().headers()) // 获取request 对象 的headers
		console.log(response.request()._method) // 获取请求方法 get post
		const dataJSON = await response.json()
		// console.log(dataJSON)
		// await this.page.addScriptTag({ // 注入脚本
		//   content: "console.log('注入脚本')"
		// })
	}
}
