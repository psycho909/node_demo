var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.cookies)
  /* res.cookie('name','mary',{
    // 有效時間
    maxAge:5000,
    // 不讓JS讀取
    httpOnly:true
  })*/
  // client端資料寫完,後端接收資料
  // console.log(req.session);
  // req.session.username='tom';
  // req.session.email='email';
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
