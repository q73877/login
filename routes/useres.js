const express = require("express");
const router = express.Router();
//拿到的model 是一个构造函数
const Usermodel = require("../model/user");

const bcryptjs = require('bcryptjs');

//页面路由
router.get("/create", (req, res) => {
    //console.log('zsd');
    res.render("register",{
        user:req.session.user
    });
    //res.send('用户注册页面')
});

//注册操作路由
router.post("/store", async (req, res) => {
    //1.获取form表单传递过来的参数
    //console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    //2. 对参数做校验

    if (!username || !password || !email) {
        res.send("参数错误");
        return;
    }

    //3.存储到数据库中

    let data = await  Usermodel.findOne({ email: req.body.email });
    console.log(data);
    if (data) {
        res.send('邮箱已存在');

    } else {

        let user = new Usermodel({
            username:req.body.username,
            email: req.body.email,
            password:bcryptjs.hashSync(req.body.password)
        });

        // save()
        await user.save();
        res.send('注册成功');
    }
   
});

//登录页面
router.get('/login',(req,res) => {
    let redirect = req.query.redire || '/posts';
    res.render('login',{
        redirect,
        user:req.session.user
    });

});

//登录页面路由
// post 和 get 请求到的 users/login 不一样
 router.post('/login',async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let redirect = req.body.redirect;

    if(!email || !password){
        res.send('登录有误');
        return;
    }
    
    let user = await Usermodel.findOne({email : email});

    if(!user){
        res.send('用户名或密码错误');
        return;
    }

    //密码对比

    let isOk = bcryptjs.compareSync(password,user.password);

    if(!isOk){
        res.send('用户名或密码错误');
        return;
    }

    req.session.user = user;
    res.redirect(redirect);
}) ;


//退出登录

router.post('/loginout',(req,res) => {
    //清除session
    req.session.destroy();
    res.redirect('/users/login')
})

module.exports = router;
