import xlsx from 'node-xlsx'
import { get, post } from './http'
import { isTrue } from '@/util/tools'

// const list = xlsx.parse('C:\\Users\\18825\\Desktop\\xzbzxb.xlsx')
const list = xlsx.parse('C:\\Users\\Admin\\Desktop\\xzbzxb.xls')

const apiUrl = 'http://mall-dev.app.htwig.com:32007'

const dataObject: any = {}
list[0].data.forEach((res: any, index) => {
	if (index) {
		if (!dataObject[res[1]]) {
			dataObject[res[1]] = []
		}
		dataObject[res[1]].push(res[2])
	}
})

let topicList: any[] = []
async function topic_lists() {
	console.time('topic_lists')
	const res = await get(apiUrl + '/v3/system/admin/mobileDeco/list', {
		pageSize: 999,
		type: 'topic'
	})
	console.timeEnd('topic_lists')

	if (res.state + '' === '200') {
		const list: any[] = res.data?.list || []
		topicList = list.map((item) => {
			// return { decoId: item.decoId, name: item.name }
			return item
		})
		return true
	} else {
		console.log('topic_lists 接口失败', res.msg)
		return false
	}
}

topic_lists().then(async () => {
	for (const item in dataObject) {
		console.log(item + '开始加载')
		await initPost(item, dataObject[item])
	}
})

async function getGoodsList(data: string) {
	const res = await get(apiUrl + '/v3/goods/admin/goods/list', { ids: data, sort: 0 })
	if (res.state + '' === '200') {
		return res.data
	} else {
		console.log('getGoodsList 接口失败', res.msg)
		return false
	}
}

async function mobileDecoUpDate(data: ObjectMap) {
	const res = await post(apiUrl + '/v3/system/admin/mobileDeco/update', data, {
		'Content-Type': 'application/x-www-form-urlencoded'
	})
	if (res.state + '' === '200') {
		// console.log(res)
	} else {
		console.log('mobileDecoUpDate 接口失败', res.msg)
	}
}

async function initPost(name: string, list: any[]) {
	let decoId = ''
	let currentItem: any = {}
	for (const item of topicList) {
		if (item.name === name) {
			decoId = item.decoId
			currentItem = item
			break
		}
	}
	if (!decoId) {
		console.log(name + '找不到专题，正在添加专题')
		await mobileDecoAdd(name, list)
		return
	}

	let tar_data = []

	if (currentItem.data) {
		try {
			tar_data = JSON.parse(currentItem.data)
		} catch (e) {
			console.log('currentItem JSON化失败')
		}
	}

	const goodList = await getGoodsList(list.join(','))

	const tuijianshangpinData = {
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

	if (isTrue(tar_data)) {
		let isEdit = false
		for (const item of tar_data) {
			if (item.type === 'tuijianshangpin') {
				item.data = { ids: list, info: goodList.list }
				isEdit = true
				break
			}
		}
		if (!isEdit) {
			console.log(name + '有内容，没有推荐商品，已加推荐商品')
			tar_data.push(tuijianshangpinData)
		} else {
			console.log(name + '有内容，有推荐商品，已改推荐商品')
		}
	} else {
		console.log(name + '没有内容，已加推荐商品')
		tar_data = [tuijianshangpinData]
	}

	const params = {
		decoId: decoId,
		data: encodeURIComponent(JSON.stringify(tar_data))
	}
	await mobileDecoUpDate(params)
	console.log(name + '更新成功')
}

async function mobileDecoAdd(name: string, list: any[]) {
	const res = await post(
		apiUrl + '/v3/system/admin/mobileDeco/add',
		{ name: name, type: 'topic' },
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	)
	if (res.state + '' === '200') {
		await topic_lists()
		await initPost(name, list)
	} else {
		console.log(name + 'mobileDecoAdd', res.msg)
	}
}
