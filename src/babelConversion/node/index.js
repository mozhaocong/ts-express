const { exec } = require('child_process')

const src = 'babelSrc/index.tsx'

// 执行脚本命令
exec(`cross-env NODE_BABEL=test babel ${src} --out-dir babeDist  --extensions ".tsx" `, (error, stdout, stderr) => {
	if (error) {
		console.error(`执行出错：${error}`)
		return
	}
	console.log(`输出：${stdout}`)
	console.error(`错误输出：${stderr}`)
})
