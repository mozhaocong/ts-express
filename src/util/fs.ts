//删除整个文件夹
import fs from 'fs'
import path from 'path'
const { resolve } = path

//通用删除文件 包含当个文件和文件夹
export const universalDeleteFiles = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		if (fs.statSync(path).isDirectory()) {
			deleteFolder(path)
		} else {
			deleteFiles(path)
		}
	}
	console.log('文件路径不存在')
}
export const deleteFolder = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = path + '\\' + file
			if (fs.statSync(curPath).isDirectory()) {
				// recurse
				deleteFolder(curPath)
			} else {
				// delete file
				fs.unlinkSync(curPath)
			}
		})
		fs.rmdirSync(path)
	}
	console.log('文件路径不存在')
}
//删除当个文件
export const deleteFiles = (path: string) => {
	path = resolve(path)
	if (fs.existsSync(path)) {
		if (!fs.statSync(path).isDirectory()) {
			fs.unlinkSync(path)
			console.log('删除成功')
		}
		console.log('当时路径是文件夹')
		return
	}
	console.log('文件路径不存在')
}
// 创建文件
export const createFile = (path: string, name: string, data: string) => {
	if (fs.existsSync(path)) {
		fs.writeFileSync(resolve(path) + '\\' + name, data)
		console.log('创建成功')
		return true
	}
	console.log('找不到对应目录')
	return false
}
// 创建文件夹
export const createFolder = (path: string, name: string): boolean | string => {
	if (fs.existsSync(path)) {
		const targetPath = resolve(path) + '\\' + name
		if (fs.existsSync(targetPath)) {
			console.log('文件已存在')
			return targetPath
		} else {
			fs.mkdirSync(targetPath)
			console.log('创建成功')
			return targetPath
		}
	}
	console.log('找不到对应目录')
	return false
}
