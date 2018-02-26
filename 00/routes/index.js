var express = require('express');
var router = express.Router();
var sha256=require('sha256');

var orders={};// 當作資料庫
var spgateway={
  HashKey:process.env.HASHKEY,
  MerchantID:process.env.MERCHANTID,
  HashIV:process.env.HASHIV
}

// console.log(spgateway)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/checkout/:id', function(req, res, next) {
  var id=req.param('id')
  var data=orders[id];
  // console.log(data)
  var parameter=`Amt=${data.Amt}&MerchantID=${spgateway.MerchantID}&MerchantOrderNo=${data.timestamp}&TimeStamp=${data.timestamp}&Version=1.2`;
  parameter=`HashKey=${spgateway.HashKey}&${parameter}&HashIV=${spgateway.HashIV}`;
  var sha=sha256(parameter).toUpperCase();
  res.render('checkout', { title: 'Express' ,data,sha,spgateway});
});

// 建立商品
router.post('/order_create',function(req, res){
  var data=req.body;
  var dateTime=Date.now();
  var timestamp=Math.floor(dateTime/1000);
  data.timestamp=timestamp;
  orders[timestamp]=data;
  res.redirect(`/checkout/${timestamp}`)
})

router.post('/spgateway_notify', (req, res, next) => {
  const JSONData = JSON.parse(req.body.JSONData);
  const Result = JSON.parse(JSONData.Result);
  const data = orders[Result.MerchantOrderNo];
  console.log('智付通 notify', JSONData, 'data', data);
  // 如果傳入交易成功
  if (JSONData.Status === 'SUCCESS') {
    // 解密驗證，注意 Result.TradeNo
    let parameter = `Amt=${data.Amt}&MerchantID=${spgateway.MerchantID}&MerchantOrderNo=${data.timestamp}&TradeNo=${Result.TradeNo}`;
    parameter = `HashIV=${spgateway.HashIV}&${parameter}&HashKey=${spgateway.HashKey}`;
    const sha = sha256(parameter).toUpperCase();
    console.log('parameter', parameter, 'sha', sha, 'CheckCode', Result.CheckCode);
    if (sha === Result.CheckCode) {
      // 另外可自訂其他驗證項目
      data.payment = Result;
      console.log('交易成功', data.payment);
      res.end();
    } else {
      console.log('交易失敗 交易碼不符合');
      res.end();
    }
  }
});

router.post('/spgateway_return', (req, res, next) => {
  const JSONData = JSON.parse(req.body.JSONData);
  const Result = JSON.parse(JSONData.Result); 
  console.log('智付通 return', JSONData);
  if (JSONData.Status === 'SUCCESS') {
    res.redirect(`/success/${Result.MerchantOrderNo}`);
  } else {
    res.redirect(`/fail/${Result.MerchantOrderNo}`);
  }
});
module.exports = router;
