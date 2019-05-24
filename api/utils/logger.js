const ansi = require('ansi');
const cursor = ansi(process.stdout);
const getCurrentTime = function() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

module.exports = function(req, res, next) {
    // console.log();
    cursor.bg.black().write(`${getCurrentTime()} 请求url${req.path} 请求参数${JSON.stringify(req.body)}\n`);
    next();
};