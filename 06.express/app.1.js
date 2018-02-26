var express = require('express');
var app = express();


var login=function(req,res,next){
    var _url=req.url;
    if(_url == '/'){
        console.log('Login')
        next()
    }else{
        res.send('Login Error')
    }
}

app.use(login)

// use()
app.use( (req, res, next) => {
    console.log('有人進來了')
    next() // 進入下一個關卡
})
app.use( (req, res, next) => {
    console.log('有人進來了2')
    next() // 進入下一個關卡
})
// 因為設定了use() 守門員
// 但沒有指定 next() 進入下一個關卡
// 頁面會卡住
app.use( (req, res, next) => {
    console.log('有人進來了3')
    next()
})
app.get('/', function (req, res) {
    res.send('<div>Hello</div>')
})

// 防止錯誤page出現
// 直接進入自訂404
app.use(function (req, res, next) {
    res.status(404).send('Sorry')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('出現問題囉')
})

// 監聽port
var port = process.env.PORT || 3000;
app.listen(port);