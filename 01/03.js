var path=require('path');

var a=1;

// 抓目錄路徑
console.log(path.dirname('/xx/yy/zz.js'))

// 合併路徑
console.log(path.join(__dirname,'/xx'))

// 抓檔名
console.log(path.basename('/xx/yy/zz.js'))

// 抓副檔名
console.log(path.extname('/xx/yy/zz.js'))

// 分析路徑
console.log(path.parse('/xx/yy/zz.js'))