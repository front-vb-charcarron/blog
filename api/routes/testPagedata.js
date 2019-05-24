module.exports = (req, res, db) => {
    console.log('req: ', req.body);
        res.send({
            answer: 'Requested'
        });
};