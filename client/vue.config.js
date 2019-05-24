module.exports = {
    // 使用pages属性, 路由懒加载的时候会出现问题
    // pages: {
    //    index: {
    //         entry: 'src/main.js',
    //         template: 'public/index.html',
    //         filename: 'index.html',
    //         title: 'web page',
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //    }
    // },
    // publicPath: './' 使用history模式时，生产环境和开发环境页面都不能正常显示
    // publicPath: './' 时, 不用history模式，开发环境和开发环境都能正常显示
    // publicPath: '/' 时, 不管用不用history模式 开发环境能正常显示而生产环境不能正常显示
    // 用node环境时，起web服务时需要更改publicPath为'/'， 开发环境则需要 './'
    publicPath: '/' , 
    // baseUrl: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: '8080',
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8088',
                pathRewrite: {
                    '^/api': ''// 子域名
                }
            },
            // '/PROD_ENV': {
            //     target: 'http://127.0.0.1:8078',
            //     ws: false,
            //     changeOrigin: false,
            //     pathRewrite: {
            //         '^/PROD_ENV': '/prod'
            //     }
            // }
    
        }
        
    },
    // configureWebpack({plugins}) {
    //     process.env.plugin = plugins;
    //     console.log(process.env);
    // }

    // chainWebpack: config => {
    //     config.plugin('webpack-bundle-analyzer')
    //             .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
}