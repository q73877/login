// users 表的model 文件

const db = require('../config/db');

// 定义好操作表的数据结构

const schema = new db.Schema({
    //描述表的数据结构
    username: String,
    email: String,
    password: String
});


// 生成 model 
// 会生成一张 users 的表
const model = db.model('user', schema);

module.exports = model;