const mongoose = require('../config/db');
const schema = new mongoose.Schema({
    title: String,
    content:String,

},{
    timestamps: true
})


const model = mongoose.model('post',schema);
module.exports = model;