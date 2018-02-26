var express = require('express');
var app = express();
var engine=require('ejs-locals');

app.use(express.static('public'));

// 使用ejs
app.engine('ejs',engine);
// 指定資料夾,所有ejs檔案都會在這執行
app.set('views','./views');
// 指定什麼engine去跑
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index',{
        'show':true,
        'title':'六角學院',
        'boss':'<h1>liao</h1>',
        'course':['html','js','bs']
    });
})
app.get('/user',(req,res)=>{
    // 會去views 找index.ejs
    res.render('user');
})

// 監聽port
var port = process.env.PORT || 3000;
app.listen(port);