// puppeteer快速调试
// 本文来源：码农网
// 本文链接：https://www.codercto.com/a/44853.html

// 前提需要谷歌浏览器和谷歌浏览器要加上 --remote-debugging-port=9222

import puppeteer from 'puppeteer-core'
import axios from 'axios'
async function get_debug_brrowse() {
	const res = await axios.get('http://127.0.0.1:9222/json/version')
	return await googlePuppeteer(res.data.webSocketDebuggerUrl)
}
async function googlePuppeteer(webSocketDebuggerUrl: string) {
	const browser = await puppeteer.connect({
		browserWSEndpoint: webSocketDebuggerUrl,
		defaultViewport: { width: 1903, height: 4231 }
	})
	return browser
}

export { get_debug_brrowse }
