const { expressInit } = require('../../express')
const router = require('../../lowCode/router')
const addFilePath = ({ t, path, state }) => {
	const filePath = state.file.opts.filename
	// 创建注释内容
	const commentContent = `File path: ${filePath}`
	// 添加注释到 Program 节点的 leadingComments 属性中
	t.addComment(path.node, 'leading', commentContent)
}

const forTypeIf = ({ data, type, callBack }) => {
	const { body = [] } = data
	body.forEach((forItem) => {
		if (forItem.type === type) {
			callBack(forItem)
		}
	})
}
module.exports = function ({ types: t }) {
	return {
		visitor: {
			Program(path, state) {
				// 获取文件路径
				// addFilePath({ t, path, state })
				// const { container } = path
				// const { program } = container
				// const { body = [] } = program
				// forTypeIf({
				// 	data: program,
				// 	type: 'ExportNamedDeclaration',
				// 	callBack: forItem => {
				// 		const { declaration } = forItem
				// 		const { body } = declaration
				// 		forTypeIf({
				// 			data: body,
				// 			type: 'ClassMethod',
				// 			callBack: callBackItem => {
				// 				const { body } = callBackItem
				// 				// const {} = body
				// 				// console.log('callBackItem', callBackItem.type)
				// 			}
				// 		})
				// 	}
				// })
			},
			ArrayExpression(path) {
				const { node, parent } = path
				if (parent.type === 'CallExpression') {
					const { callee = {} } = parent
					const { property = {} } = callee
					const { name } = property
					if (name === 'setColumns') {
						const { elements = {} } = node
						console.log('path', elements)
						const { properties = [] } = elements
					}
				}
			}
		}
	}
}
