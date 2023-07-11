var express = require('express');
var app = express();
var dbConfig = require(__dirname + '/config/db.js');
var conn = dbConfig.init();
var bodyParser = require('body-parser');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
var authCheck = require('./authCheck');


dbConfig.connect(conn);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

// 추가 (이건 그냥 별거 아님)
app.get('/', function (req, res) {
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    if (!authCheck.isOwner(req, res)) {
        var sql = 'SELECT review_moviename FROM review GROUP BY review_moviename order by AVG(review_grade) DESC';
        conn.query(sql, function (err, row, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else res.render('index.ejs', {title : row, nickname : nickname, IS : IS});
                });
        return false;
    }
    else {
        var sql = 'SELECT review_moviename FROM review GROUP BY review_moviename order by AVG(review_grade) DESC';
        conn.query(sql, function (err, row, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else 
            var nickname = req.session.nickname;
            var IS = req.session.is_logined;
            
            res.render('index.ejs', {title : row, nickname : nickname, IS : IS});
                });
        return false;
    }
});

app.get('/reserve', function(req, res) {
    if (!authCheck.isOwner(req, res)) {
        res.redirect('/login'); //로그인 안하고 마이페이지 갈시
    }
    else {
        let movie_name = req.query.movie_name;
        var sql1 = 'SELECT * FROM movie WHERE movie_name =?';
        conn.query(sql1, [movie_name], function (err, rows1, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else 
                var sql2 = 'SELECT reserve_seat FROM reserve WHERE reserve_moviename =?';
                conn.query(sql2, [movie_name], function (err, rows2, fields) {
                    if(err) console.log('query is not excuted. select fail...\n' + err);
                    else res.render('reserve.ejs', { title : rows1, seats : rows2});
                });
        });
    }
})

app.get('/reserving', function(req, res) {
    let movie_name = req.query.movie_name;
    let movie_time = req.query.movie_time;
    let movie_seats = req.query.seats;
    var movie_seat = movie_seats.split(',')
    console.log(movie_name,movie_time, movie_seats.split(',').length);
    for (var i = 0; i < movie_seat.length; i++) {
        var sql = 'insert into `reserve` (`reserve_uid`,  `reserve_seat`, `reserve_moviestart`, `reserve_movieend`, `reserve_moviename`) VALUES ("' + req.session.nickname + '", "' + movie_seat[i] + '", "2023-07-07 00:00:00.000000", "2023-07-07 02:00:00.000000", "' + movie_name + '")';
        conn.query(sql, [movie_name], function (err) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
        });
    }
    res.send(`<script type="text/javascript">alert("예매가 완료되었습니다!"); 
    document.location.href="/";</script>`);
})

app.use(express.static("views"));
// 추가 (이게 핵심)
app.post('/movie_in', function (req, res) {
    var body = req.body;
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    var sql = 'SELECT * FROM movie WHERE movie_name=?';
    var sql2 = 'SELECT * FROM review WHERE review_moviename=?'
    console.log(body.moviename)
    conn.query(sql,body.moviename, function (err, rows, fields) {
        conn.query(sql2, body.moviename,function(err,data,fields){
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else res.render('movie_in.ejs', {list : rows, reviews:data, IS:IS, nickname : nickname});
        });
        
       
    });
});


app.get('/login', function(req, res) {
    res.render('login.ejs');
});                         //로그인으로 가게함

app.get('/logoutprocess', function(req, res) {
    req.session.destroy(error => {if(error) console.log(error)});
    res.redirect('/');
})
app.get('/my_page', function(req, res) {
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;

    if (!authCheck.isOwner(req, res)) {
        res.redirect('/login'); //로그인 안하고 마이페이지 갈시
    }
    else {
        var nickname = req.session.nickname;
        var IS = req.session.is_logined;
        var sql = 'SELECT * FROM user WHERE user_id =?';
        var sql2 = 'SELECT * FROM reserve WHERE reserve_uid=? '
        conn.query(sql, [nickname], function (err, rows, fields) {
            conn.query(sql2,[nickname],function(err,data,fields){
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else res.render('my_page.ejs', {mypage : rows, myreserve : data ,nickname : nickname, IS : IS});
            });
            
    });
    }
});         //마이페이지으로 가게함


app.get('/movie', function(req, res) {
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    if (!authCheck.isOwner(req, res)) {
        var sql = 'SELECT * FROM movie';
        conn.query(sql, function (err, rows, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else res.render('movie.ejs', {movie : rows, IS :IS});
    }); 
    }else {
        var sql = 'SELECT * FROM movie';
        var nickname = req.session.nickname;
        var IS = req.session.is_logined;
        var sql2 = 'SELECT * FROM user WHERE user_id =?';
        conn.query(sql2, [nickname], function (err, row, fields) {
            conn.query(sql, function (err, rows, fields) {
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else res.render('movie.ejs', {movie : rows,  nickname : nickname, IS : IS});
        }); 
            
           
    });
    }

    
});                         //영화페이지으로 감

app.post('/inreview', function (req, res) {
    var body = req.body;
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    
    var sql = 'INSERT INTO review (review_uid, review_grade, review_olreview, review_moviename, review_writedate) values (?,?,?,?,NOW())';
    var params = [nickname, body.rate, body.olreview, body.moviename]
    var sql2 = 'SELECT * FROM movie WHERE movie_name=?'
    var sql3 = 'SELECT * FROM review WHERE review_moviename =?'
    if (!authCheck.isOwner(req, res)) {
        res.redirect('/login'); //로그인 안하고 마이페이지 갈시
    }

    else{
        console.log(body.rate);
        conn.query(sql,params, function (err, rows, fields) {
            conn.query(sql2,body.moviename,function(err,data){
                conn.query(sql3,body.moviename,function(err,datas){
                    if(err) console.log('query is not excuted. select fail...\n' + err);
                    else res.render('movie_in.ejs', {list : data,reviews:datas, IS:IS, nickname:nickname});
                });
              
            });
        
           
            

        });
    }
    
});


app.get('/login', function(req, res) {
    res.render('login.ejs');
});                         //영화시간선택으로 가게함



app.post('/search', function(req, res) {
    var body = req.body;
    var searchinput = body.searchinput;
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    var sql = 'SELECT * FROM movie WHERE movie_name LIKE  "%' + searchinput + '%" OR movie_genre LIKE "%' + searchinput + '%" GROUP BY movie_name' ;
        conn.query(sql, function (err, rows, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else res.render('search.ejs', {title : rows, nickname : nickname, IS : IS});

    });
});                         //검색페이지으로 감

app.post('/chinformation', function (req, res) {
    var body = req.body;
    var sql = 'UPDATE user set User_age =?, User_pw=?, User_Phonenum=?, User_email=? WHERE User_name =?' ;
    var params = [body.age, body.chpassword, body.phone, body.email, body.uname];

    var sql3 = 'UPDATE user set User_age =?, User_Phonenum=?,User_email=? WHERE User_name =?';
    var params2 = [body.age, body.phone, body.email, body.uname];

    var sql2 = 'SELECT User_pw from user WHERE User_name =?';

    conn.query(sql2,body.uname, function (err, data, fields) {
        console.log(body.uname);
        if(data[0].User_pw == body.password){
            console.log(data[0].User_pw);
            if(body.chpassword != ""){
                conn.query(sql,params,function(err,rows,fields){
                    if(err) console.log('query is not excuted. insert fail...\n' + err);
                    else res.send(`<script type="text/javascript">alert("정보가 수정되었습니다! 비밀번호 변경이 완료되었습니다."); 
                    document.location.href="/my_page";</script>`);
                });
            }
            else  conn.query(sql3, params2, function(err,rows,fields) {
                if(err) console.log('query is not excuted. insert fail...\n' + err);
                else res.send(`<script type="text/javascript">alert("정보가 수정되었습니다!"); 
                document.location.href="/my_page";</script>`);
                
        });
      
    }else res.send(`<script type="text/javascript">alert("비밀번호가 틀렸습니다. 변경이 취소됩니다.");document.location.href="/my_page";</script>`);
    
       
        });
        
});

app.post('/membership', function (req, res) {
    var body = req.body;
    var sql = 'INSERT INTO user VALUES(?, ?, ?,? ,? ,?, ?)';
    var params = [body.user_id, body.user_pw, body.user_name,body.user_age, body.user_phonenum, body.user_email,0];

   
    var sql2 = 'SELECT * from user WHERE user_id =?';
    conn.query(sql2,[body.user_id], function (err, data, fields) {
        if(data.length!=0){res.send(`<script type="text/javascript">alert("이미 있는 ID 입니다."); 
        document.location.href="/login";</script>`);}
    
        else conn.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            else res.redirect('/');
        });
       
        });
        
});

app.post('/login_process', function (req, res) {
    var body = req.body;
    var sql = 'SELECT * from user WHERE user_id =? and user_pw =?';
    var username = body.user_id;
    var password = body.user_pw;

    if (username && password) {             // id와 pw가 입력되었는지 확인
        
        conn.query(sql, [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                req.session.is_logined = true;      // 세션 정보 갱신
                req.session.nickname = username;
                req.session.save(function () {
                    res.redirect(`/`);
                });
            } else {              
                res.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/login";</script>`);    
            }            
        });

    } else {
        res.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/login";</script>`);    
    }
});
app.listen(3000, () => console.log('포트 3000번에서 시작'));