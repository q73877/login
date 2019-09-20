//  mongoose 连接

const mongoose = require('mongoose');


// 定义一个mongoo 的链接地址  
//协议是  mongoose   端口是 27017   连接的数据库名是 express
const url = 'mongodb://127.0.0.1:27017/express';

// 使用mongoose 莫模块的 connect（） 方法 连接

mongoose.connect(url,{useUnifiedTopology : true , useNewUrlParser:true}).then(() => {
    console.log('数据库连接成功');

}).catch((err) => {
    console.log('数据库连接失败');
    console.log(err);
});


module.exports = mongoose;

