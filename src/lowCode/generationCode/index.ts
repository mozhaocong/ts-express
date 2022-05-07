import fs from 'fs'
import path from 'path'
const { resolve } = path
const pathSrc = 'C:/Users/Admin/Desktop/ppt'

//
// const data11 = fs.readFileSync(pathSrc + '/1.ts', 'utf8')
// console.log(data11)
// fs.writeFile(pathSrc + '/1.ts', '2161261261', (a) => {
// 	console.log(a)
// })
// fs.mkdir(pathSrc + '/test', (err) => {
// 	if (!err) {
// 		fs.writeFile(pathSrc + '/test/1.ts', '216512616126', (a) => {
// 			console.log(a)
// 		})
// 	}
// })
// const rmdirSync = fs.rmdirSync(pathSrc + '/test')
// const rmdirSync = fs.unlinkSync(pathSrc + '/test/1.ts')
// console.log('rmdirSync', rmdirSync)

function deleteFolder(path: string) {
	const data = fs.readdirSync(path)
	console.log('data', data)
}
