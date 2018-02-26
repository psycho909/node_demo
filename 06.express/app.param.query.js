var express=require('express');
var app=express();

app.get('/user/:name/',function(req,res){
    // params - 取得指定路徑
    // http://localhost:3000/user/chen/
    var myName=req.params.name;
    console.log(myName)
    // query - 取得網址參數
    // http://localhost:3000/user/chen?q=POE&limit=30
    var limit=req.query.limit;
    var q=req.query.q;
    console.log(req.query)
    console.log(limit)
    res.send('<html><head><body>'+myName+' Key Word '+q+' Find '+limit+'</body></head></html>')
})

app.get('/user',function(req,res){
    res.send('uSET')
})

// 監聽port
var port=process.env.PORT || 3000;
app.listen(port);