module.exports = (req, res, db) => {
    let fields = req.body;
    db.connect();
    db.query(
        'DELETE FROM work WHERE id=?',
        [fields.id],
        (err, rows, field) => {
            if (err) throw err;
            res.send({
                code: 200,
                type: 'success',
                msg: '删除成功',
                works: rows,
                field: field
            });
        }
    );
    db.end()
};