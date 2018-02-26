var express = require('express');
var app = express();

// 增加靜態檔案的路徑
// 指定public資料夾
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('<div>Hello <img src="/images/logo.png" alt=""/></div>')
})


// 監聽port
var port = process.env.PORT || 3000;
app.listen(port);