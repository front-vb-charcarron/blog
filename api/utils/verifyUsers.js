module.exports = function (user, db) {
    return new Promise((resolve, reject) => {
        db.connect();
        db.query(
            'SELECT * FROM users WHERE name=? AND passwords=?',
            [user.name, user.password],
            (err, rows, field) => {
                if (err) throw err;
                if (rows.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
        db.end();
    });
};