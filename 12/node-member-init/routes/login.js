var express = require('express');
var router = express.Router();
var firebase=require('../connection/firebase_conncect');
var firebaseDb=require('../connection/firebase_admin_connection')
var fireAuth=firebase.auth();
router.get('/', function (req, res) {
    
    res.render('login', { title: '登入' });
})
router.post('/', function (req, res) {
    fireAuth.signInWithEmailAndPassword(req.body.email, req.body.passwd)
    .then(function(user){
        // 登入成功後會再session 留下uid
        // 之後可以在任何登入頁面邏輯下使用
        req.session.uid=user.uid;
        res.redirect('/')
        console.log(user)
        console.log('Success')
    })
    .catch(function(error){
        res.redirect('/')
        console.log('Error')
    })
})
module.exports = router;