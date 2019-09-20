const express = require('express');

const moment = require('moment');

const router = express.Router();


const PostModel = require('../model/post');

const auth = require('../middkewares/auth');

//文章列表
router.get('/',auth(), async(req,res) => {

    //console.log(req.session);

    if(!req.session.user){
        res.send('没有登录');
        return;
    }



   // let pageNum = parseInt(req.query.pageNum) || 1;
    //let pageSize = parseInt(req.query.pageSize) || 30;


    let list = await PostModel.find().sort({updatedAt : -1})//.skip((pageNum-1)*pageSize).limit(pageSize);

//list 返回的是伪数组 ，需要转换

    list = JSON.parse(JSON.stringify(list));

//对 list 每一项 的 updataAt 做时间格式转换
    
   // moment 第三方模块  对时间做格式化处理
   list.forEach(element => {
        let abc = new Date(element.updatedAt);
        element.updatedAt = moment(abc).format('YYYY-MM-DD HH:MM:SS')
    });
    


    res.render('posts/index',{
        list,
        user:req.session.user

    });
    //console.log(list)
});


// 新增文章页面
router.get('/create',auth(),(req,res) => {
    res.render('posts/create',{
        user:req.session.user
    });
});


//文章详情
router.get('/:id',auth(),async(req,res) => {
    //获取到文章id\
    let id = req.params.id;

    let data = await PostModel.findById(id);
    res.render('posts/show',{postInfo:data,user:req.session.user});
    
    //res.send(data);
})


//新增文章
router.post('/store',async(req,res) => {
    //数据校验
    if(!req.body.title || !req.body.content){
        res.send('参数错误');
        return;
    }

    //存到数据库
    let newPost = new PostModel(req.body);
    await newPost.save();
    
    res.redirect('/posts');
    //res.send('新增成功');
    console.log(newPost);
})

//编辑文章页面

router.get('/:id/edit',auth(),async(req,res) => {
    let id = req.params.id;
    let post = await PostModel.findById(id);
    res.render('posts/edit',{
        title : post.title,
        content:post.content,
        id:post._id,
        user:req.session.user
    })
    //res.send(post.title);
})

//编辑文章操作

router.post('/update',async(req,res) => {
    //修改的文章id
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    console.log(content);

    //数据库修改
    let data = await PostModel.updateOne({ _id : id },{ title : title,content : content});
    res.send('修改成功')
    console.log(data);
});

//删除接口  ajax 调用

router.delete('/:id',async(req,res) => {
    let id = req.params.id;

    await PostModel.deleteOne({_id:id});

    res.send({
        code :  0,
        msg: '删除成功'
    })
})


module.exports = router;