var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

var csrf=require('csurf');
var csrfProtection=csrf({cookie:true});

require('dotenv').config();

router.get('/',csrfProtection,function(req, res) {
    console.log(process.env.gmailUser)
    console.log(process.env.gmailPass)
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
        req.flash('errors','姓名不可為空');
        res.redirect('/contact');
    }
    var transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.gmailUser,
            pass:process.env.gmailPass
        }
    });

    var mailOptions={
        form:'"AKA"<service@hexschool.com>',
        to:req.body.email,
        subject:req.body.username+' 寄了一封信',
        text:req.body.description
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            return console.log(error);
        }
        res.redirect('review')
    })

    res.redirect('/contact/review');
});
module.exports = router;
