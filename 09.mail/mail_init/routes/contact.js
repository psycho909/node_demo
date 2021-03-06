var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var csrf=require('csurf');
var csrfProtection=csrf({cookie:true})
require('dotenv').config()

router.get('/',csrfProtection, function(req, res) {
    res.render('contact',{
        csrfToken:req.csrfToken(),
        errors:req.flash('errors')
    });
});
router.get('/review', function(req, res) {
    res.render('contactReview');
});

router.post('/post',csrfProtection, function(req, res) {
    if(req.body.username == ''){
        req.flash('errors','姓名不可為空')

        res.redirect('/contact')
    }
    var transport=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.gmailUser,
            pass:process.env.gmailPass
        }
    })
    var mailOptions={
        form:"Chen Cing<service@gmail.com>",
        to:"meelook1379@gmail.com",
        subject:req.body.username+'寄了一封信',
        text:req.body.description
    }
    transport.sendMail(mailOptions,function(err,info){
        if(err){
            return console.log(error);
        }
        res.redirect('review')
    })
    
    // res.redirect('/contact/review');
});
module.exports = router;
