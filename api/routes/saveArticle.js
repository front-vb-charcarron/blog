const checkEmptyField = data => {
    for (let k in data) {
        if (data[k] == '') {
            return true;
        }
    }
    return false;
}; 
module.exports = (req, res, db) => {
    let fields = req.body;
    if (checkEmptyField(fields)) {
        res.send({
            code: 200,
            msg: '字段不为空！',
            type: 'warning'
        });
    } else {
        db.connect();
        db.query(
            'INSERT INTO article (template, date) VALUES(?)',
            [fields.template, fields.date],
            (err, rows, field) => {
                if (err) throw err;
                res.send({
                    code: 200,
                    msg: '添加成功',
                    type: 'success'
                });
            }
        );
        db.end();
    }
}