const verifyToken = require('./token').verifyToken;

module.exports = function (req, res, next) {
    if (req.url !== '/login') { // 校验除登录外的token
        const { token } = req.headers; // 在请求头上获取token
        verifyToken(token, function(err, decoded) {
            if (err) {
                console.log('redirect');
                // 每次请求只会返回一次， res.send, 多个res.send也只会返回第一个。
                res.send({
                    err: err,
                    success: false,
                    code: 401
                });   
            } else {
                next();
            }
        });
    } else {
        next(); 
    }
}