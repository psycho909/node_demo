var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // client端資料寫完,後端接收資料
  // console.log(req.session);
  // req.session.username='tom';
  // req.session.email='email';
  // 寫入資料端到client,後端轉前端時
  // res.cookie('name','mary',{
  //   maxAge:10000,
  //   httpOnly:true
  // })
  res.render('index', { 
    userName: req.session.username,
    email:req.session.email 
  });
});
router.post('/',function(req,res){
  req.session.username=req.body.username;
  req.session.email=req.body.email;
  res.redirect('/');
})
module.exports = router;
