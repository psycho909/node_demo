var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");

var serviceAccount = require("./node-todolist-11347-firebase-adminsdk-od3qz-fd19e0377a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-todolist-11347.firebaseio.com"
});
var fireData=admin.database();

app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//路由
app.get('/',function(req,res){
    fireData.ref('todos').once('value',(snapshot)=>{
        var data=snapshot.val();
        var title=data.title;
        res.render('index',{
            todolist:data
        })
    })
})

app.post('/addTodo',(req,res)=>{
    var content=req.body.content;
    var contentRef=fireData.ref('todos').push();
    contentRef.set({"content":content})
    .then(()=>{
        fireData.ref('todos').once('value',(snapshot)=>{
            res.send(
                {
                    success:true,
                    result:snapshot.val(),
                    message:'資料讀取成功'
                }
            )
        })
    })
})


app.post('/removeTodo',(req,res)=>{
    var _id=req.body.id;
    fireData.ref('todos').child(_id).remove()
    .then(()=>{
        fireData.ref('todos').once('value',(snapshot)=>{
            res.send(
                {
                    success:true,
                    result:snapshot.val(),
                    message:'資料刪除成功'
                }
            )
        })
    })
})
// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);