import fs from 'fs'
import xlsx from 'node-xlsx'
import { get, post } from './http'
const list = xlsx.parse('C:\\Users\\Admin\\Desktop\\数据.xlsx')
// console.log(list[0].data)
const dataObject: any = {}
list[0].data.forEach((res: any, index) => {
	if (index) {
		if (!dataObject[res[1]]) {
			dataObject[res[1]] = []
		}
		dataObject[res[1]].push(res[2] + '')
	}
})
let topicList: any[] = []
async function topic_lists() {
	const res = await get('http://mall-dev.app.htwig.com:32007/v3/system/admin/mobileDeco/list', {
		pageSize: 999,
		type: 'topic'
	})

	if (res.state + '' === '200') {
		const list: any[] = res.data?.list || []
		topicList = list.map((item) => {
			return { decoId: item.decoId, name: item.name }
		})
	} else {
		console.log(res.msg)
	}
	// get('http://mall-dev.app.htwig.com:32007/v3/goods/admin/goods/list?ids=' + ids.join(','))
}

topic_lists().then(() => {
	for (const item in dataObject) {
		console.log(item)
		initPost(item, dataObject[item])
	}
})

async function initPost(name: string, list: any[]) {
	let decoId = ''
	console.log(topicList)
	for (const item of topicList) {
		if (item.name === name) {
			decoId = item.decoId
			break
		}
	}
	if (!decoId) {
		await mobileDecoAdd(name, list)
		return
	}
	console.log('成功')
}

async function mobileDecoAdd(name: string, list: any[]) {
	console.log(name)
	const res = await post(
		'http://mall-dev.app.htwig.com:32007/v3/system/admin/mobileDeco/add',
		'name=Luvme512Hairjddk&type=topic&data=',
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	)
	if (res.state + '' === '200') {
		console.log('res 成功')
		await topic_lists()
		await initPost(name, list)
	} else {
		console.log('res.msg', res.msg)
	}
}
