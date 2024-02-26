// 监听父进程发送的消息
const { exec } = require('child_process')
const path = require('path')

process.on('message', async message => {
	await new Promise((resolve, reject) => {
		exec(`npm run node --prefix ${path.join(__dirname, '../')}`, (error, stdout, stderr) => {
			if (error) {
				console.error('启动项目2时发生错误：', error)
				resolve(true)
				return
			}
			console.log('stdout',stdout)
			resolve(true)
		})
	})

	// 向父进程发送消息
	process.send('Hello from child process!')
})
