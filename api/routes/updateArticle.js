module.exports = (req, res, db) => {
    let fields = req.body;
    if (fields.id) {
        db.connect();
        db.query(
            'UPDATE work SET archived=1 WHERE id=?',
            [fields.id],
            (err, rows, field) => {
                if (err) throw err;
                res.send({
                    code: 200,
                    msg: '回归成功！',
                    type: 'success',
                    works: rows,
                    field: field
                })
            }
        );
        db.end();
    } else {
        res.send({
            code: 200,
            msg: 'id不存在！',
            type: 'warning'
        });
    }
    
};