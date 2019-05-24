const checkEmptyField = data => {
    for (let k in data) {
        if (data[k] == '') {
            return true;
        }
    }
    return false;
}; 

module.exports = (req, res, db, format) => {
    let fields = req.body;
    if (checkEmptyField(fields)) {
        res.send(format({
            msg: '字段不为空！',
            type: 'warning'
        }));
    } else {
        db.connect();
        db.query(
            'INSERT INTO articles (hours, date, description) VALUES(?, ?, ?)',
            [fields.hours, fields.date, fields.description],
            (err, rows, field) => {
                if (err) throw err;
                res.send(format({
                    msg: '添加成功',
                    works: rows,
                    type: 'success',
                    field: field
                }));
            }
        );
        db.end();
    }
    
};