var express = require('express');
var path=require('path')
var app = express();
var user=require('./routes/user');
var engine=require('ejs-locals');
var bodyParser=require('body-parser');

var user=require('./routes/user')

// 增加 body 解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    {extended:false}
))
app.engine('ejs',engine)
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.resolve(__dirname,'public')))

app.use('/user',user)

app.get('/',(req,res)=>{
    res.send('你現在進入的東西是首頁')
})

app.get('/search',(req,res)=>{
    res.render('search')
})
app.post('/searchList',(req,res,next)=>{
    console.log(req.body)
    res.redirect('search')
})

app.post('/searchAJAX',(req,res,next)=>{
    res.send(req.body)
})


// app.use((req,res)=>{
//     res.status(404).send('404Page')
// })
var port=process.env.PORT||3000;

app.listen(port)