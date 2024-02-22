import { createFile, createFolder, createPathFile, universalDeleteFiles } from '@/util/fs'
import { data } from '@/createFile/data'

// const data = { a: { b: { c: { post: 1 }, d: { post: 2 } }, d: { post: 3 } } }
// const data1 = ['a/b/c/2', 'a/b/d/3', 'a/d/4']

const objectToArray = (item: { data: ObjectMap; currentPath?: string }) => {
	const { data, currentPath = '' } = item
	let pathList = []
	for (const dataKey in data) {
		if (dataKey === 'post') {
			return [{ path: currentPath.slice(0, -1), data: data[dataKey] }]
		} else {
			const path = currentPath + dataKey + '/'
			const list = objectToArray({ data: data[dataKey], currentPath: path })
			pathList = [...pathList, ...list]
		}
	}
	return pathList
}

export const init = (item) => {
	// console.log(process.cwd())
	// console.log(__dirname)
	// console.log(objectToArray({ data: data }))
	// const list = objectToArray({ data: data })
	item.data.forEach((forItem) => {
		const { data, path } = forItem
		const { responsesType, requestBodyType } = data
		createPathFile({
			path: process.cwd() + '/src/api/' + path + '.ts',
			data: `
		${requestBodyType}
		${responsesType}
		`
		})
	})

	// console.log('11111')
	// console.log(__dirname)
	// console.log(process.cwd())
	// const data1 = createFile(__dirname, 'index.text', '214124')
	// const data2 = createFolder(__dirname, 'index/dd/s')
	// const data2 = createPathFile({ path: __dirname + '/api/src/scm/index2.tsx', data: '1' })
	// universalDeleteFiles(__dirname + '/api')
}
