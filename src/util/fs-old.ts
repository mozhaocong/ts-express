//删除整个文件夹
import fs from 'fs'
import path from 'path'
const { resolve } = path

//通用删除文件 包含当个文件和文件夹
export const universalDeleteFiles = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		console.log('fs.statSync(path)', fs.statSync(path).isDirectory())
		if (fs.statSync(path).isDirectory()) {
			return deleteFolder(path)
		} else {
			return deleteFiles(path)
		}
	}
	console.log('universalDeleteFiles 文件路径不存在', path)
	return false
}

// 删除文件夹
export const deleteFolder = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = resolve(path, file)
			if (fs.statSync(curPath).isDirectory()) {
				// recurse
				deleteFolder(curPath)
			} else {
				// delete file
				fs.unlinkSync(curPath)
				return true
			}
		})
		fs.rmdirSync(path)
		return true
	}
	console.log('deleteFolder 文件路径不存在 ', path)
	return false
}
//删除当个文件
export const deleteFiles = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		if (!fs.statSync(path).isDirectory()) {
			fs.unlinkSync(path)
			console.log('删除成功')
			return true
		}
		console.log('当时路径是文件夹')
		return false
	}
	console.log('deleteFiles 文件路径不存在')
	return false
}
// 创建文件
export const createFile = (path: string, name: string, data: string) => {
	if (fs.existsSync(path)) {
		const filePath = resolve(path, name)
		fs.writeFileSync(filePath, data)
		console.log('创建成功', filePath)
		return true
	}
	console.log('找不到对应目录', path)
	return false
}
// 创建文件夹
export const createFolder = (path: string, name?: string): boolean | string => {
	if (fs.existsSync(path)) {
		const targetPath = resolve(path, name)
		if (fs.existsSync(targetPath)) {
			console.log('文件已存在', targetPath)
			return targetPath
		} else {
			fs.mkdirSync(targetPath, { recursive: true })
			console.log('创建成功', targetPath)
			return targetPath
		}
	}
	console.log('找不到对应目录', path)
	return false
}

// 输入路径，生成文件
export const createPathFile = (item: { path: string; data: any }): any => {
	const { path: pathSrc, data } = item
	if (!path.extname(pathSrc)) {
		console.log('输入的地址没有文件类型', pathSrc)
		return false
	}
	const dirnamePath = path.dirname(pathSrc)
	try {
		fs.mkdirSync(dirnamePath, { recursive: true })
		fs.writeFileSync(resolve(pathSrc), data)
		console.log('写入成功', pathSrc)
		return true
	} catch (e) {
		console.log('写入失败', pathSrc)
		return false
	}
}
