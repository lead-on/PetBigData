var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/get/data', function(req, res, next) {

    var dataType = req.query.dataType;
    var keyword = req.query.keyword;

    if (!(dataType == 'food' || dataType == 'disease' || dataType == 'symptom' || dataType == 'tag' || dataType == 'product')) {
        res.json({ status: 'ERR_WRONG_DATA' });
        return;
    }

    var query = "SELECT * FROM t_" + dataType;
    if (keyword != '') {
        query += " WHERE " + dataType[0] + "_keyword LIKE ?";
        keyword = "%" + keyword + "%";
    }

    o.mysql.query(query, keyword, function(error, result) {
        if (error) {
            console.log(error);
            res.json({ status: 'ERR_MYSQL' });
            return;
        }

        res.json({ status: 'OK', result: { data_list: result } });
    });
});


module.exports = router;
