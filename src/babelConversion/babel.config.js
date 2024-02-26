const path = require('path')
module.exports = function (api) {
	api.cache(true)
	let presets = []
	let plugins = []

	if (process.env.NODE_BABEL === 'test') {
		plugins = ['./babelPlugins/plugin.js']
		presets = ['@babel/preset-typescript']
		return {
			presets,
			plugins
		}
	}
	// 根据自定义命令来设置不同的参数
	presets = ['@babel/preset-env', '@babel/preset-react']
	plugins = [
		['import', { libraryName: 'antd', style: 'css' }, 'ant'],
		[
			'import',
			{
				libraryName: '@ant-design/icons',
				libraryDirectory: 'es/icons',
				camel2DashComponentName: false
			},
			'ant-design-icons'
		]
	]
	return {
		presets,
		plugins
	}
}
