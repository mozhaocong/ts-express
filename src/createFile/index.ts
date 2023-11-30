import { createFile, createFolder, createPathFile, universalDeleteFiles } from '@/util/fs'

export const init = () => {
	// console.log('11111')
	// console.log(__dirname)
	// console.log(process.cwd())
	// const data1 = createFile(__dirname, 'index.text', '214124')
	// const data2 = createFolder(__dirname, 'index/dd/s')
	const data2 = createPathFile({ path: __dirname + '/api/src/scm/index2.tsx', data: '1' })
	universalDeleteFiles(__dirname + '/api')
}
