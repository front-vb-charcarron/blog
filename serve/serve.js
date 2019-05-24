const express = require('express');
const server = express();
const history = require('connect-history-api-fallback');
const path = require('path');
const port = 8090;
const hostName = '127.0.0.1';

server.use(
    history({
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'], // 覆盖Accepts，更改请求的dataType配置
        verbose: true, // 打开日志
    //     rewrites: [ //正则匹配输入的路径
    //         {
    //             from: /^\/index\/*$/,
    //             to: function(context) {
    //                 console.log(context);
    //                 return context.parsedUrl.pathname + 'html';
    //             }
            
    //         },
    //         {
    //             from: /\/index\/game/,
    //             to: '/index/game'
    //         },
    //         {
    //             from: /\/index\/home/,
    //             to: '/index/home'
    //         },
    //         {
    //             from: /\/index\/article/,
    //             to: '/index/article'
    //         }
    //     ]
    })
);
const segments = __dirname.replace(/\/serve/, '');
// 代理静态资源的请求。例如css、js、图片等。
server.use(express.static(path.join(segments, 'client', 'dist')));
const html = path.join(segments, 'client', 'project', 'index.html');

// 因为vue是单页面应用，确保用户刷新和输入地址都是跳转到index.html
server.get('*', (req, res) => {
    res.sendFile(html);
});

server.listen(port, hostName, () => console.log(`服务运行在http://${hostName}:${port}`))