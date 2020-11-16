var express = require('express');
var router = express.Router();
var formidable = require('formidable');

const AWS = require('aws-sdk');
const fs  = require('fs');

require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESSKEYID,
    secretAccessKey: process.env.S3_SECRETKEY,
    region : process.env.S3_REGION
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        menu: 'main'
    });
});


router.get('/data/disease', function(req, res, next) {
    res.render('index', {
        menu: 'data_disease'
    });
});
router.get('/data/disease/add', function(req, res, next) {
    res.render('index', {
        menu: 'data_disease_add'
    });
});


router.get('/data/food', function(req, res, next) {
    res.render('index', {
        menu: 'data_food'
    });
});
router.get('/data/food/add', function(req, res, next) {
    res.render('index', {
        menu: 'data_food_add'
    });
});



router.get('/data/symptom', function(req, res, next) {
    res.render('index', {
        menu: 'data_symptom'
    });
});
router.get('/data/symptom/add', function(req, res, next) {
    res.render('index', {
        menu: 'data_symptom_add'
    });
});


router.get('/data/product', function(req, res, next) {
    res.render('index', {
        menu: 'data_product'
    });
});
router.get('/data/product/add', function(req, res, next) {
    res.render('index', {
        menu: 'data_product_add'
    });
});


router.get('/data/tag', function(req, res, next) {
    res.render('index', {
        menu: 'data_tag'
    });
});


router.post('/upload_img', (req, res) => {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.multiples = true;
    form.uploadDir = 'upload';
    form.keepExtensions = true;

    form.parse(req, (error, params, files) => {

        if (error) {
            res.json({ status: 'ERR_UPLOAD' });
            return;
        }

        console.log(files);

        let image_path = files.image.path;
        console.log(`image_path: ${image_path}`);

        var param = {
            'Bucket': process.env.S3_BECKIT,
            'Key': 'image/' + image_path, // 저장할 이름
            'ACL':'public-read',
            'Body':fs.createReadStream(image_path),
            'ContentType':'image/jpeg'
        }

        s3.upload(param, function(err, data){
            console.log('err', err);
            console.log('succ', data);
            res.json({ status: 'OK'});
        });

        // s3.deleteObject({
        //       Bucket: process.env.S3_BECKIT, // 사용자 버켓 이름
        //       Key: '1.png' // 버켓 내 경로
        //     }, (err, data) => {
        //       if (err) { throw err; }
        //       console.log('s3 deleteObject ', data)
        //
        //       res.json({ status: 'OK'});
        //     })

        //이미지 이름 바꾸기
        // let move_path = image_path.replace('upload/temp', 'upload/idol_looklike_user');

    });
})

module.exports = router;
