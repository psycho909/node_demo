var express = require('express');
var app = express();
var engine=require('ejs-locals');
var bodyParser=require('body-parser');

// 增加靜態檔案的路徑
app.use(express.static('public'));
// 增加body的解析,可解析JSON格式
app.use(bodyParser.json());
// 解析一般表單的資料,可以讓表單順利抓出name的資料
app.use(bodyParser.urlencoded(
    {extended:false}
))

app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');

app.get('/search',(req,res)=>{
    res.render('search')
})

// 當使用者傳送到後端伺服器時
app.post('/searchList',(req,res)=>{
    console.log(req.body)
    // 轉址回到search page
    res.redirect('search')
})

app.post('/searchAJAX',(req,res)=>{
    console.log(req.body)
    res.send('Hello');
})

// 監聽port
var port = process.env.PORT || 3000;
app.listen(port);