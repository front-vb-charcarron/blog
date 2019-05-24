const express = require('express');
const hostName = '127.0.0.1';
const port = '8088';
const bodyParser = require('body-parser'); // post 解析参数
const app = express();
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json;charset=utf-8",
    "cache-control": "max-age=3600" // 缓存头
};
const fs = require('fs');
const path = require('path');
const src = path.resolve(__dirname, 'routes');
const logger = require('./utils/logger'); 
const interceptor = require('./utils/interceptor');
const format = require('./utils/formatJson');

// post 解析参数
app.use(bodyParser.json());

// 设置响应头
app.all('*', (req, res, next) => {
    res.header(headers);
    next();
});

// 日志中间件
app.use(logger);

// 拦截器(校验token)
app.use(interceptor);

// 遍历routers文件夹下的文件注册路由
fs.readdirSync(src).forEach(file => {
    let route = '/' + file.replace(/[A-Z]/g, letter => '/' + letter.toLowerCase()).replace('.js', ''),
        handle =  require(src + '/' +file);
    
    console.log('route: ', '\033[32m' + route + '\033[39m');

    app.use(route, async (req, res) => {
        const db = require('./utils/dataBase')(); // 每个路由都生成对应的mysql实例
        await handle(req, res, db, format);
    });
});

//500 
app.use((err, res, req, next) => {
    console.log('error', err.stack);
    res.send(err.stack);
});


app.listen(port, hostName, () => console.log(`服务运行在http://${hostName}:${port}`));

// node 进程退出前调用的方法
process.on('exit', function() {
    console.log('Server shut down!');
});

// 未捕获时触发的方法
process.on('uncaughtException', function(err) {
    console.error('got uncaught exception :', err.message);
    process.exit(1);
});

// ctrl c 退出时调用的方法
process.on('SIGINT', function() {
    console.log('Got Ctrl-C!');
    // app.close();
    process.exit();
});