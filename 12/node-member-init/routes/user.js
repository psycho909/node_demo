var express = require('express');
var router = express.Router();
var firebaseDb=require('../connection/firebase_admin_connection');

router.get('/', function (req, res) {
    // req.session.uid 在login登入後產生的
    firebaseDb.ref('/user/'+req.session.uid).once('value',function(snapshot){
        res.render('user', { 
            title: '會員專區',
            nickname:snapshot.val().nickname
        });
    })
})
module.exports = router; 