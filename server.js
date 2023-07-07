var express = require('express');
var app = express();
var dbConfig = require(__dirname + '/config/db.js');
var conn = dbConfig.init();

dbConfig.connect(conn);

// 추가 (이건 그냥 별거 아님)
app.get('/', function (req, res) {
    var sql = 'SELECT movie_name FROM moive where movie_name like "%어벤%"';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('index.ejs', {list : rows});
    });
    
    // res.render('index.ejs',{title : sql});
});
app.use(express.static("views"));
// 추가 (이게 핵심)
app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
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

app.post('/write', function (req, res) {
    var body = req.body;
    var sql = 'INSERT INTO user VALUES(?, ?, ?)';
    var params = [body.id, body.name, body.age];
    
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.redirect('/list');
    });
});