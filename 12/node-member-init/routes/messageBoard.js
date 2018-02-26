var express = require('express');
var router = express.Router();
var firebaseDb=require('../connection/firebase_admin_connection');
router.post('/', function (req, res) {
    req.checkBody('content',"內容不能為空").notEmpty();
    var errors=req.validationErrors();
    console.log(errors)
    if(errors){
        req.flash('errors',errors[0].msg)
        res.redirect('/')
    }else{
        firebaseDb.ref('/user/'+req.session.uid).once('value',function(snapshot){
            var nickname=snapshot.val().nickname;
            var ref=firebaseDb.ref('list').push();
            var listCotent={
                nickname:nickname,
                content:req.body.content
            }
            ref.set(listCotent)
            .then(function(){
                res.redirect('/')
            })
        })
    }
})
module.exports = router;