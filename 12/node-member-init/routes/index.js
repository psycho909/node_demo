var express = require('express');
var router = express.Router();
var firebaseDb=require('../connection/firebase_admin_connection');
var firebase=require('../connection/firebase_conncect.js');
router.get('/', function (req, res, next) {
    firebaseDb.ref('list').once('value',(snapshot)=>{
        var auth=req.session.uid;
        res.render('index', {
            title: '六角學院留言板',
            auth:auth,
            errors:req.flash('errors'),
            list:snapshot.val()
        });
    })
    
});
/* GET home page. */
module.exports = router;