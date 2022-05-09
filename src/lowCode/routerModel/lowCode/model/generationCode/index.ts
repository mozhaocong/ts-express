// import fs from 'fs'
//
// import { createFile, createFolder, deleteFolder } from '@/util/fs'
// const pathSrc = 'C:\\Users\\Admin\\Desktop'
//
// const data = createFolder(pathSrc, 'ppt')
// createFile(data as string, 'index.txt', '125')

import { createFile, createFolder } from '@/util/fs'

export default (res: ObjectMap): ObjectMap => {
	console.log(res)
	const pathSrc = res.path
	const data = createFile(pathSrc, 'index.tsx', res.data)
	return { data: data }
}
