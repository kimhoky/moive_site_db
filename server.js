var express = require("express");
var app = express();
var dbConfig = require(__dirname + "/config/db.js");
var conn = dbConfig.init();
var bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
var authCheck = require("./authCheck");

let ua_table = [];
let date = [
  ["20231001", "토"],
  ["20231002", "일"],
  ["20231003", "월"],
  ["20231004", "화"],
  ["20231005", "수"],
  ["20231006", "목"],
  ["20231007", "금"],
  ["20231008", "토"],
  ["20231009", "일"],
  ["20231010", "월"],
  ["20231011", "화"],
  ["20231012", "수"],
  ["20231013", "목"],
  ["20231014", "금"],
  ["20231015", "토"],
  ["20231016", "일"],
  ["20231017", "월"],
  ["20231018", "화"],
  ["20231019", "수"],
  ["20231020", "목"],
  ["20231021", "금"],
  ["20231022", "토"],
  ["20231023", "일"],
  ["20231024", "월"],
  ["20231025", "화"],
  ["20231026", "수"],
  ["20231027", "목"],
  ["20231028", "금"],
  ["20231029", "토"],
  ["20231030", "일"],
  ["20231031", "월"],
];

dbConfig.connect(conn);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "~~~", // 원하는 문자 입력
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
var sql2 = "SELECT AVG(review_grade) FROM review GROUP BY review_moviename";
// 추가 (이건 그냥 별거 아님)
app.get("/", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    var sql =
      "SELECT review_moviename, AVG(review_grade) as average FROM review GROUP BY review_moviename order by AVG(review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else res.render("index.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  } else {
    var sql =
      "SELECT review_moviename, AVG(review_grade) as average FROM review GROUP BY review_moviename order by AVG(review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else var nickname = req.session.nickname;
      var IS = req.session.is_logined;

      res.render("index.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  }
});

//뮤지컬 페이지로 이동
app.get("/musical", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  //뮤지컬 리뷰테이블에서 평점의 평균값을 토대로 순위 배정
  if (!authCheck.isOwner(req, res)) {
    var sql =
      "SELECT mu_review_musicalname, AVG(mu_review_grade) as average FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else
        res.render("musical.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  } else {
    var sql =
      "SELECT mu_review_musicalname, AVG(mu_review_grade) as average FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else var nickname = req.session.nickname;
      var IS = req.session.is_logined;

      res.render("musical.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  }
});

app.get("/musical_page", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    var sql =
      "SELECT mu_review_musicalname FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else
        res.render("musical_page.ejs", {
          title: row,
          nickname: nickname,
          IS: IS,
        });
    });
    return false;
  } else {
    var sql =
      "SELECT mu_review_musicalname FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else var nickname = req.session.nickname;
      var IS = req.session.is_logined;

      res.render("musical_page.ejs", {
        title: row,
        nickname: nickname,
        IS: IS,
      });
    });
    return false;
  }
});

app.get("/musical", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    var sql =
      "SELECT mu_review_musicalname FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else
        res.render("musical.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  } else {
    var sql =
      "SELECT mu_review_musicalname FROM mu_review GROUP BY mu_review_musicalname order by AVG(mu_review_grade) DESC";
    conn.query(sql, function (err, row, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else var nickname = req.session.nickname;
      var IS = req.session.is_logined;

      res.render("musical.ejs", { title: row, nickname: nickname, IS: IS });
    });
    return false;
  }
});

app.get("/statistics", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    var sql = "SELECT * FROM movie";
    conn.query(sql, function (err, rows, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else res.render("statistics.ejs", { movie: rows, IS: IS });
    });
  } else {
    var sql = "SELECT * FROM movie";
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    var sql2 = "SELECT * FROM user WHERE user_id =?";
    var sql3 =
      "SELECT m.movie_genre, COUNT(*) AS count_of_reservations FROM reserve r JOIN movie m ON r.reserve_moviename = m.movie_name GROUP BY m.movie_genre";
    conn.query(sql2, [nickname], function (err, row, fields) {
      conn.query(sql, function (err, rows, fields) {
        conn.query(sql3, async function (err, list, fields) {
          if (err) console.log("query is not excuted. select fail...\n" + err);
          else var data_0_9 = await queryForAgeGroup("0-9");
          var data_10_19 = await queryForAgeGroup("10-19");
          var data_20_29 = await queryForAgeGroup("20-29");
          var data_30_39 = await queryForAgeGroup("30-39");
          var data_40_49 = await queryForAgeGroup("40-49");
          var data_50_59 = await queryForAgeGroup("50-59");
          console.log(data_20_29);
          res.render("statistics.ejs", {
            list: list,
            movie: rows,
            nickname: nickname,
            IS: IS,
            data_0_9: data_0_9,
            data_10_19: data_10_19,
            data_20_29: data_20_29,
            data_30_39: data_30_39,
            data_40_49: data_40_49,
            data_50_59: data_50_59,
          });
        });
      });
    });
  }
});

app.get("/reserve", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    res.redirect("/login"); //로그인 안하고 예매페이지 갈시
  } else {
    let movie_name = req.query.movie_name;
    let movie_day = req.query.movie_day;
    let movie_stime = req.query.movie_stime;
    let movie_etime = req.query.movie_etime;
    let reserve_stime = "2023-10-" + movie_day + " " + movie_stime;
    var sql1 = "SELECT * FROM movie WHERE movie_name =?";
    conn.query(sql1, [movie_name], function (err, rows1, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else
        var sql2 =
          "SELECT reserve_seat FROM reserve WHERE reserve_moviename =? AND reserve_moviestart =?";
      conn.query(
        sql2,
        [movie_name, reserve_stime],
        function (err, rows2, fields) {
          if (err) console.log("query is not excuted. select fail...\n" + err);
          else {
            var screening = new Array(3);
            screening[0] = movie_day;
            screening[1] = movie_stime;
            screening[2] = movie_etime;
            res.render("reserve.ejs", {
              title: rows1,
              seats: rows2,
              screening: screening,
              IS: IS,
              nickname: nickname,
            });
          }
        }
      );
    });
  }
});

app.get("/choice", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    res.redirect("/login"); //로그인 안하고 예매페이지 갈시
  } else {
    let movie_name = req.query.movie_name;
    var sn = null;
    if (req.query.day != null) {
      sn = req.query.day;
    }
    // let movie_name = "오펜하이머";
    var sql1 = "SELECT * FROM screening WHERE screening_name =?";
    conn.query(sql1, [movie_name], function (err, rows1, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else {
        var sql2 =
          "SELECT screening_day FROM screening WHERE screening_name =?";
        conn.query(sql2, [movie_name], function (err, rows2, fields) {
          if (err) console.log("query is not excuted. select fail...\n" + err);
          else {
            let day = [];
            rows2.forEach((element, i) => {
              day.push(rows2[i].screening_day);
            });

            var dayd = formated(date, day);
            var selectednum = selectnum(date, day);
            res.render("choice.ejs", {
              title: rows1,
              date: date,
              rows2: rows2,
              day: day,
              dayd: dayd,
              selectednum: selectednum,
              sn: sn,
              IS: IS,
              nickname: nickname,
            });
          }
        });
      }
    });
  }
});

app.get("/reserving", function (req, res) {
  let movie_name = req.query.movie_name;
  let movie_day = req.query.movie_day;
  let movie_stime = req.query.movie_stime;
  let movie_etime = req.query.movie_etime;
  let movie_seats = req.query.seats;
  var movie_seat = movie_seats.split(",");
  for (var i = 0; i < movie_seat.length; i++) {
    var sql =
      'insert into `reserve` (`reserve_uid`,  `reserve_seat`, `reserve_moviestart`, `reserve_movieend`, `reserve_moviename`) VALUES ("' +
      req.session.nickname +
      '", "' +
      movie_seat[i] +
      '", "' +
      movie_day +
      " " +
      movie_stime +
      '", "' +
      movie_day +
      " " +
      movie_etime +
      '", "' +
      movie_name +
      '")';
    conn.query(sql, [movie_name], function (err) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
    });
  }
  res.send(`<script type="text/javascript">alert("예매가 완료되었습니다!"); 
    document.location.href="/";</script>`);
});

app.use(express.static("views"));
// 추가 (이게 핵심)
app.post("/movie_in", function (req, res) {
  var body = req.body;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  var duplicate = "false";
  var params2 = [nickname, body.moviename];
  var sql = "SELECT * FROM movie WHERE movie_name=?";
  var sql2 = "SELECT * FROM review WHERE review_moviename=?";
  var sql4 = "SELECT * FROM review WHERE review_uid =? and review_moviename =?";
  console.log(body.moviename);
  conn.query(sql, body.moviename, function (err, rows, fields) {
    conn.query(sql2, body.moviename, function (err, data, fields) {
      conn.query(sql4, params2, function (err, row) {
        if (row != "") {
          duplicate = "true";
        }
        if (err) console.log("query is not excuted. select fail...\n" + err);
        else
          res.render("movie_in.ejs", {
            list: rows,
            reviews: data,
            IS: IS,
            nickname: nickname,
            duplicate: duplicate,
          });
      });
    });
  });
});

// 통계페이지
app.post("/stat", function (req, res) {
  var body = req.body;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  var duplicate = "false";
  var params2 = [nickname, body.moviename];
  var sql = "SELECT * FROM movie";
  var sql2 = "SELECT * FROM reserve WHERE reserve_uid=?";
  var sql4 = "SELECT * FROM user WHERE User_ID =?";
  conn.query(sql, function (err, rows, fields) {
    conn.query(sql2, nickname, function (err, data, fields) {
      conn.query(sql4, nickname, function (err, row) {
        if (err) console.log("query is not excuted. select fail...\n" + err);
        else
          res.render("stat.ejs", {
            list: rows,
            reviews: data,
            IS: IS,
            nickname: nickname,
            duplicate: duplicate,
          });
      });
    });
  });
});

app.post("/musical_in", function (req, res) {
  var body = req.body;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  var sql = "SELECT * FROM musical WHERE musical_name=?";
  var sql2 = "SELECT * FROM mu_review WHERE mu_review_musicalname=?";
  console.log(body.musicalname);
  conn.query(sql, body.musicalname, function (err, rows, fields) {
    conn.query(sql2, body.musicalname, function (err, data, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else
        res.render("musical_in.ejs", {
          list: rows,
          reviews: data,
          IS: IS,
          nickname: nickname,
        });
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
}); //로그인으로 가게함
app.get("/choice", function (req, res) {
  res.render("choice.ejs");
});
app.get("/musical", function (req, res) {
  res.render("musical.ejs");
});
app.get("/musical_page", function (req, res) {
  res.render("musical_page.ejs");
});
app.get("/logoutprocess", function (req, res) {
  req.session.destroy((error) => {
    if (error) console.log(error);
  });
  res.redirect("/");
});
app.get("/my_page", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;

  if (!authCheck.isOwner(req, res)) {
    res.redirect("/login"); //로그인 안하고 마이페이지 갈시
  } else {
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    var sql = "SELECT * FROM user WHERE user_id =?";
    var sql2 = "SELECT * FROM reserve WHERE reserve_uid=? ";
    conn.query(sql, [nickname], function (err, rows, fields) {
      conn.query(sql2, [nickname], function (err, data, fields) {
        if (err) console.log("query is not excuted. select fail...\n" + err);
        else
          res.render("my_page.ejs", {
            mypage: rows,
            myreserve: data,
            nickname: nickname,
            IS: IS,
          });
      });
    });
  }
}); //마이페이지으로 가게함

app.get("/movie", function (req, res) {
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  if (!authCheck.isOwner(req, res)) {
    var sql = "SELECT * FROM movie";
    conn.query(sql, function (err, rows, fields) {
      if (err) console.log("query is not excuted. select fail...\n" + err);
      else res.render("movie.ejs", { movie: rows, IS: IS });
    });
  } else {
    var sql = "SELECT * FROM movie";
    var nickname = req.session.nickname;
    var IS = req.session.is_logined;
    var sql2 = "SELECT * FROM user WHERE user_id =?";
    conn.query(sql2, [nickname], function (err, row, fields) {
      conn.query(sql, function (err, rows, fields) {
        if (err) console.log("query is not excuted. select fail...\n" + err);
        else
          res.render("movie.ejs", { movie: rows, nickname: nickname, IS: IS });
      });
    });
  }
}); //영화페이지으로 감

app.post("/inreview", function (req, res) {
  var body = req.body;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  var duplicate = "false";
  var sql =
    "INSERT INTO review (review_uid, review_grade, review_olreview, review_moviename, review_writedate) values (?,?,?,?,NOW())";
  var params = [nickname, body.rate, body.olreview, body.moviename];
  var params2 = [nickname, body.moviename];
  var sql2 = "SELECT * FROM movie WHERE movie_name=?";
  var sql3 = "SELECT * FROM review WHERE review_moviename =?";
  var sql4 = "SELECT * FROM review WHERE review_uid =? and review_moviename =?";
  if (!authCheck.isOwner(req, res)) {
    res.redirect("/login"); //로그인 안하고 마이페이지 갈시
  } else {
    console.log(body.rate);
    conn.query(sql, params, function (err, row) {
      conn.query(sql2, body.moviename, function (err, data) {
        conn.query(sql3, body.moviename, function (err, datas) {
          conn.query(sql4, params2, function (err, rows) {
            if (rows != "") {
              duplicate = "true";
            }
            if (err)
              console.log("query is not excuted. select fail...\n" + err);
            else
              res.render("movie_in.ejs", {
                list: data,
                reviews: datas,
                IS: IS,
                nickname: nickname,
                duplicate: duplicate,
              });
          });
        });
      });
    });
  }
});

app.post("/inmureview", function (req, res) {
  var body = req.body;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;

  var sql =
    "INSERT INTO mu_review (mu_review_uid, mu_review_grade, mu_review_olreview, mu_review_musicalname, mu_review_writedate) values (?,?,?,?,NOW())";
  var params = [nickname, body.rate, body.olreview, body.musicalname];
  var sql2 = "SELECT * FROM musical WHERE musical_name=?";
  var sql3 = "SELECT * FROM mu_review WHERE mu_review_musicalname =?";
  if (!authCheck.isOwner(req, res)) {
    res.redirect("/login"); //로그인 안하고 마이페이지 갈시
  } else {
    console.log(body.rate);
    conn.query(sql, params, function (err, rows, fields) {
      conn.query(sql2, body.musicalname, function (err, data) {
        conn.query(sql3, body.musicalname, function (err, datas) {
          if (err) console.log("query is not excuted. select fail...\n" + err);
          else
            res.render("musical_in.ejs", {
              list: data,
              reviews: datas,
              IS: IS,
              nickname: nickname,
            });
        });
      });
    });
  }
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
}); //영화시간선택으로 가게함

app.post("/search", function (req, res) {
  var body = req.body;
  var searchinput = body.searchinput;
  var nickname = req.session.nickname;
  var IS = req.session.is_logined;
  var sql =
    'SELECT * FROM movie WHERE movie_name LIKE  "%' +
    searchinput +
    '%" OR movie_genre LIKE "%' +
    searchinput +
    '%" GROUP BY movie_name';
  conn.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else res.render("search.ejs", { title: rows, nickname: nickname, IS: IS });
  });
}); //검색페이지으로 감

app.post("/chinformation", function (req, res) {
  var body = req.body;
  var sql =
    "UPDATE user set User_age =?, User_pw=?, User_Phonenum=?, User_email=? WHERE User_name =?";
  var params = [body.age, body.chpassword, body.phone, body.email, body.uname];

  var sql3 =
    "UPDATE user set User_age =?, User_Phonenum=?,User_email=? WHERE User_name =?";
  var params2 = [body.age, body.phone, body.email, body.uname];

  var sql2 = "SELECT User_pw from user WHERE User_name =?";

  conn.query(sql2, body.uname, function (err, data, fields) {
    console.log(body.uname);
    if (data[0].User_pw == body.password) {
      console.log(data[0].User_pw);
      if (body.chpassword != "") {
        conn.query(sql, params, function (err, rows, fields) {
          if (err) console.log("query is not excuted. insert fail...\n" + err);
          else
            res.send(`<script type="text/javascript">alert("정보가 수정되었습니다! 비밀번호 변경이 완료되었습니다."); 
                    document.location.href="/my_page";</script>`);
        });
      } else
        conn.query(sql3, params2, function (err, rows, fields) {
          if (err) console.log("query is not excuted. insert fail...\n" + err);
          else
            res.send(`<script type="text/javascript">alert("정보가 수정되었습니다!"); 
                document.location.href="/my_page";</script>`);
        });
    } else
      res.send(
        `<script type="text/javascript">alert("비밀번호가 틀렸습니다. 변경이 취소됩니다.");document.location.href="/my_page";</script>`
      );
  });
});

app.post("/membership", function (req, res) {
  var body = req.body;
  var sql = "INSERT INTO user VALUES(?, ?, ?,? ,? ,?, ?)";
  var params = [
    body.user_id,
    body.user_pw,
    body.user_name,
    body.user_age,
    body.user_phonenum,
    body.user_email,
    0,
  ];

  var sql2 = "SELECT * from user WHERE user_id =?";
  conn.query(sql2, [body.user_id], function (err, data, fields) {
    if (data.length != 0) {
      res.send(`<script type="text/javascript">alert("이미 있는 ID 입니다."); 
        document.location.href="/login";</script>`);
    } else
      conn.query(sql, params, function (err) {
        if (err) console.log("query is not excuted. insert fail...\n" + err);
        else res.redirect("/");
      });
  });
});

app.post("/login_process", function (req, res) {
  var body = req.body;
  var sql = "SELECT * from user WHERE user_id =? and user_pw =?";
  var username = body.user_id;
  var password = body.user_pw;

  if (username && password) {
    // id와 pw가 입력되었는지 확인

    conn.query(sql, [username, password], function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        // db에서의 반환값이 있으면 로그인 성공
        req.session.is_logined = true; // 세션 정보 갱신
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
app.listen(3000, () => console.log("포트 3000번에서 시작"));

function formated(date, day_input) {
  var dayd = new Array(date.length);
  var formattedsDate = new Array(day_input.length);
  for (var i = 0; i < date.length; i++) {
    dayd[i] = "day";
    for (var j = 0; j < day_input.length; j++) {
      var dateString = day_input[j];
      var dateObj = new Date(dateString);

      var year = dateObj.getFullYear();
      var month = ("" + (dateObj.getMonth() + 1)).padStart(2, "");
      var day = ("" + dateObj.getDate()).padStart(2, "");

      formattedsDate[j] = year + month + day;
    }
    if (formattedsDate.indexOf(date[i][0]) < 0) {
      if (date[i][1] == "토") {
        dayd[i] += " day-sat dimmed";
      } else if (date[i][1] == "일") {
        dayd[i] += " day-sun dimmed";
      } else {
        dayd[i] += " dimmed";
      }
    } else {
      if (date[i][1] == "토") {
        dayd[i] += " day-sat";
      } else if (date[i][1] == "일") {
        dayd[i] += " day-sun";
      }
    }
  }
  return dayd;
}

function selectnum(date, day_input) {
  var selectednum = [];
  var formattedsDate = new Array(day_input.length);
  var daynum = [];
  for (var i = 0; i < date.length; i++) {
    for (var j = 0; j < day_input.length; j++) {
      var dateString = day_input[j];
      var dateObj = new Date(dateString);

      var year = dateObj.getFullYear();
      var month = ("" + (dateObj.getMonth() + 1)).padStart(2, "");
      var day = ("" + dateObj.getDate()).padStart(2, "");

      daynum[j] = dateObj.getDate();
      formattedsDate[j] = year + month + day;
    }
  }
  for (let item of daynum) {
    if (!selectednum.includes(item)) {
      selectednum.push(item);
    }
  }
  return selectednum;
}

// 나이대 별로 데이터를 가져오는 함수
function queryForAgeGroup(ageGroup) {
  return new Promise((resolve, reject) => {
    // 나이대 별로 쿼리 작성
    const query = `
      SELECT m.movie_genre, COUNT(*) AS genre_count
      FROM user u
      JOIN reserve r ON u.user_id = r.reserve_uid
      JOIN movie m ON r.reserve_moviename = m.movie_name
      WHERE u.user_age >= ? AND u.user_age <= ?
      GROUP BY m.movie_genre ORDER BY m.movie_genre
    `;

    // 나이대에 따라 매핑되는 실제 나이 범위 설정 (예: '0-9' -> 0, 9)
    let ageRange = [0, 9];
    if (ageGroup === "10-19") {
      ageRange = [10, 19];
    } else if (ageGroup === "20-29") {
      ageRange = [20, 29];
    } else if (ageGroup === "30-39") {
      ageRange = [30, 39];
    } else if (ageGroup === "40-49") {
      ageRange = [40, 49];
    } else if (ageGroup === "50-59") {
      ageRange = [50, 59];
    }
    // 다른 나이대에 대한 범위도 추가 가능

    // 쿼리 실행
    conn.query(query, ageRange, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // 결과를 배열 형태로 변환하여 반환
        const genreCounts = results.map((row) => row.genre_count);
        resolve([genreCounts]);
      }
    });
  });
}

module.exports = { queryForAgeGroup };
