const { fork, exec} = require('child_process');
const path = require("path");

// 启动子进程
const childProcess = fork(path.join(__dirname, '../babelConversion/node/fork.js'));

// 监听子进程发送的消息
childProcess.on('message', (message) => {
    console.log('父进程收到消息：', message   );
    childProcess.kill();

});

// 向子进程发送消息
childProcess.send('Hello from parent process!');

// const { exec } = require('child_process')
// const path = require("path");
// exec(`npm run node --prefix ${path.join(__dirname, '../babelConversion')}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error('启动项目2时发生错误：', error)
//         return
//     }
//     console.log('stdout',stdout)
// })
