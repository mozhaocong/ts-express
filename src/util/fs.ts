import fs from 'fs'
import path from 'path'

// 使用 path.join 替代 resolve
const joinPath = (...paths: string[]) => path.join(...paths)

/**
 * 通用删除文件函数，包含单个文件和整个文件夹
 * @param {string} filePath - 要删除的文件或文件夹路径
 * @returns {boolean} - 操作是否成功
 */
export const universalDeleteFiles = (filePath: string): boolean => {
	filePath = joinPath(filePath)

	if (!fs.existsSync(filePath)) {
		console.log('文件路径不存在:', filePath)
		return false
	}

	if (fs.statSync(filePath).isDirectory()) {
		return deleteFolder(filePath)
	} else {
		return deleteFile(filePath)
	}
}

/**
 * 删除整个文件夹
 * @param {string} folderPath - 要删除的文件夹路径
 * @returns {boolean} - 操作是否成功
 */
export const deleteFolder = (folderPath: string): boolean => {
	folderPath = joinPath(folderPath)

	if (!fs.existsSync(folderPath)) {
		console.log('文件夹路径不存在:', folderPath)
		return false
	}

	fs.readdirSync(folderPath).forEach((file) => {
		const curPath = joinPath(folderPath, file)
		if (fs.statSync(curPath).isDirectory()) {
			deleteFolder(curPath)
		} else {
			deleteFile(curPath)
		}
	})

	fs.rmdirSync(folderPath)
	return true
}

/**
 * 删除单个文件
 * @param {string} filePath - 要删除的文件路径
 * @returns {boolean} - 操作是否成功
 */
export const deleteFile = (filePath: string): boolean => {
	filePath = joinPath(filePath)

	if (!fs.existsSync(filePath)) {
		console.log('文件路径不存在:', filePath)
		return false
	}

	fs.unlinkSync(filePath)
	console.log('文件已删除:', filePath)
	return true
}

/**
 * 创建文件
 * @param {string} folderPath - 要创建文件的文件夹路径
 * @param {string} fileName - 要创建的文件名
 * @param {string} data - 要写入文件的数据
 * @returns {boolean} - 操作是否成功
 */
export const createFile = (folderPath: string, fileName: string, data: string): boolean => {
	folderPath = joinPath(folderPath)

	if (!fs.existsSync(folderPath)) {
		console.log('文件夹路径不存在:', folderPath)
		return false
	}

	const filePath = joinPath(folderPath, fileName)
	fs.writeFileSync(filePath, data)
	console.log('文件已创建:', filePath)
	return true
}

/**
 * 创建文件夹
 * @param {string} basePath - 基础路径
 * @param {string} [folderName] - 要创建的文件夹名称（可选）
 * @returns {boolean | string} - 操作是否成功，如果文件夹已存在则返回文件夹路径
 */
export const createFolder = (basePath: string, folderName?: string): boolean | string => {
	basePath = joinPath(basePath)

	if (!fs.existsSync(basePath)) {
		console.log('基础路径不存在:', basePath)
		return false
	}

	const targetPath = folderName ? joinPath(basePath, folderName) : basePath

	if (fs.existsSync(targetPath)) {
		console.log('文件夹已存在:', targetPath)
		return targetPath
	} else {
		fs.mkdirSync(targetPath, { recursive: true })
		console.log('文件夹已创建:', targetPath)
		return targetPath
	}
}

/**
 * 输入路径，生成文件
 * @param {{ path: string; data: any }} item - 包含路径和数据的对象
 * @returns {boolean} - 操作是否成功
 */
export const createPathFile = (item: { path: string; data: any }): boolean => {
	const { path: pathSrc, data } = item

	if (!path.extname(pathSrc)) {
		console.log('输入路径没有文件类型:', pathSrc)
		return false
	}

	const dirnamePath = path.dirname(pathSrc)

	try {
		fs.mkdirSync(dirnamePath, { recursive: true })
		fs.writeFileSync(joinPath(pathSrc), data)
		console.log('文件写入成功:', pathSrc)
		return true
	} catch (e) {
		console.error('写入文件时发生错误:', pathSrc, e)
		return false
	}
}
