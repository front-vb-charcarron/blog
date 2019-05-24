const verifyUsers = require('../utils/verifyUsers');
const createToken = require('../utils/token').createToken;

module.exports = (req, res, db, format) => {
    let token,type, msg;
    
    verifyUsers(req.body, db).then(result => {
        console.log('result: ', result);
        if (result) {
            token = createToken();
            msg = '登录成功';
            type = 'success';
        } else {
            msg = '登录失败';
            type = 'error';
        }

        // res.cookie('token', token); // 直接在浏览器里添加cookie

        res.send(format({
            type: type,
            msg: msg,
            token: token,
        }));

    }).catch(err => reject(err));
   
};

