import xlsx from 'node-xlsx'
import { get, post } from './http'
const list = xlsx.parse('C:\\Users\\18825\\Desktop\\数据.xlsx')
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
		return true
	} else {
		console.log(res.msg)
		return false
	}
}

topic_lists().then(() => {
	for (const item in dataObject) {
		initPost(item, dataObject[item])
	}
})

async function getGoodsList(data: string) {
	const res = await get('http://mall-dev.app.htwig.com:32007/v3/goods/admin/goods/list', { ids: data })
	if (res.state + '' === '200') {
		return res.data
	} else {
		console.log(res.msg)
		return false
	}
}

async function mobileDecoUpDate(data: ObjectMap) {
	const res = await post('http://mall-dev.app.htwig.com:32007/v3/system/admin/mobileDeco/update', data, {
		'Content-Type': 'application/x-www-form-urlencoded'
	})
	if (res.state + '' === '200') {
		console.log(res)
	} else {
		console.log('res.msg', res.msg)
	}
}

async function initPost(name: string, list: any[]) {
	let decoId = ''
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
	const goodList = await getGoodsList(list.join(','))

	const tar_data = [
		{
			id: 1,
			type: 'tuijianshangpin',
			is_show: true,
			admin_text: '推荐商品',
			admin_icon: 'ziyuan3',
			isshow_sales: 0,
			cart_icon_type: 1,
			show_style: 'small',
			border_radius: 10,
			border_style: 'border_none',
			page_margin: 10,
			goods_margin: 10,
			text_align: 'flex-start',
			text_style: 'normal',
			data: {
				ids: list,
				info: goodList.list
			}
		}
	]
	// console.log(qs.stringify(tar_data))
	const params = {
		decoId: decoId,
		data: encodeURIComponent(JSON.stringify(tar_data))
	}
	// const test: string = JSON.stringify({
	// 	id: 1,
	// 	type: 'tuijianshangpin',
	// 	is_show: true,
	// 	admin_text: '推荐商品'
	// })

	// console.log('buf str', buf, str)
	await mobileDecoUpDate(params)
	console.log('成功')
}

async function mobileDecoAdd(name: string, list: any[]) {
	const res = await post(
		'http://mall-dev.app.htwig.com:32007/v3/system/admin/mobileDeco/add',
		{ name: name, type: 'topic' },
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	)
	if (res.state + '' === '200') {
		await topic_lists()
		await initPost(name, list)
	} else {
		console.log('res.msg', res.msg)
	}
}
