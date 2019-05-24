module.exports = (req, res, db) => {
    db.connect();
    db.query(
            'SELECT * FROM work WHERE archived=? ORDER BY id ASC', // 显示未回归的信息， 以id为降序显示。
            [0],
            (err, rows, field) => {
                if (err) throw err;
                res.send({
                    code: 200,
                    works: rows,
                    field: field
                });
            }       
        );
    db.end();
}