module.exports = (req, res, db) => {
    var fields = req.body;
    console.log('fields: ', fields);
    db.connect();
    db.query(
        'SELECT * FROM article WHERE id=? ORDER BY id ASC', // 显示未回归的信息， 以id为降序显示。
        [fields.id],
        (err, rows, field) => {
            if (err) throw err;
            res.send({
                code: 200,
                template: rows,
                field: field
            });
        }
    );
    db.end();
}
 
  


 
 
