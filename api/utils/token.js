
const jwt = require('jsonwebtoken');

exports.createToken = () => jwt.sign({
    foo: 'bar',// 30分钟  单位：秒  exp参数不能抽取！！否则校验时token不正确 可能是时间戳不准确的问题。
    exp: Math.floor(Date.now() / 1000) + (60 * 30)  
 }, 'shhhhh');

exports.verifyToken = (token, cb) => {
    jwt.verify(token, 'shhhhh', (err, decoded) => {
        cb && cb(err, decoded);        
    }); 
}
