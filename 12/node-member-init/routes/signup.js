var express = require('express');
var router = express.Router();
var firebase=require('../connection/firebase_conncect');
var firebaseDb=require('../connection/firebase_admin_connection')
var fireAuth=firebase.auth();
router.get('/', function (req, res) {
    res.render('signup', { 
        title: '註冊',
        error:req.flash('error')
    });
})

router.post('/', function (req, res) {
    var email=req.body.email;
    var password=req.body.passwd;
    var nickname=req.body.nickname;
    fireAuth.createUserWithEmailAndPassword(email, password)
    .then(function(user){
        console.log(user)
        var saveUser={
            'email':email,
            'nickname':nickname,
            'uid':user.uid
        }
        firebaseDb.ref('/user/'+user.uid).set(saveUser)
        res.redirect('/signup/success')
    })
    .catch(function(error){
        var errMessage=error.message;
        // 使用flash暫存功能
        req.flash('error',errMessage);
        // 轉址回到
        res.redirect('/signup')
    })
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;