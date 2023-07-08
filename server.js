var express = require('express');
var app = express();
var dbConfig = require(__dirname + '/config/db.js');
var conn = dbConfig.init();

dbConfig.connect(conn);

// 추가 (이건 그냥 별거 아님)
app.get('/', function (req, res) {
    var sql = 'SELECT review_moviename FROM review GROUP BY review_moviename order by AVG(review_grade) DESC';
    conn.query(sql, function (err, row, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('index.ejs', {title : row});
            });
        
        
       
    
    
    // res.render('index.ejs',{title : sql});
});


// app.get('/', function (req, res) {
//     var sql = 'SELECT review_moviename FROM review GROUP BY review_moviename order by AVG(review_grade) DESC';
//     conn.query(sql, function (err, row, fields) {
//         if(err) console.log('query is not excuted. select fail...\n' + err);
//         else var sql2 = 'SELECT movie_agecut FROM movie WHERE movie_name IN (SELECT review_moviename FROM review GROUP BY review_moviename order by AVG(review_grade) DESC)'
//             conn.query(sql2, function (err, rows, fields) {
//                 if(err) console.log('query is not excuted. select fail...\n' + err);
//                 else res.render('index.ejs', {title : row, age : rows});
//             });
        
        
       
//     });
    
//     // res.render('index.ejs',{title : sql});
// });

app.use(express.static("views"));
// 추가 (이게 핵심)
app.get('/list', function (req, res) {
    var sql = 'SELECT user_id FROM user where user_age = 20';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('index.ejs', {list : rows});
    });
});
app.get('/login', function(req, res) {
    res.render('login.ejs');
});                         //로그인으로 가게함

app.listen(3000, () => console.log('포트 3000번에서 시작'));
var bodyParser = require('body-parser');

app.use(express.urlencoded({extended: true}));

app.post('/membership', function (req, res) {
    var body = req.body;
    var sql = 'INSERT INTO user VALUES(?, ?, ?,? ,? ,?, ?)';
    var params = [body.user_id, body.user_pw, body.user_name,body.user_age, body.user_phonenum, body.user_email,null];

   
    var sql2 = 'SELECT * from user WHERE user_id =?';
    conn.query(sql2,[body.user_id], function (err, data, fields) {
        if(data.length!=0){res.write("<script>alert('Already this ID tooken');location.href='/login';</script>");}
    
        else conn.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            else res.redirect('/');
        });
       
        });
        //res.redirect('/login');
});