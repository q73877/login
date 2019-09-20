const express = require('express');
const app = express();

const userRouter = require('./routes/useres');
const postRouter = require('./routes/post');

const cookieParser = require('cookie-parser');
const session = require('express-session');




// 模板引擎  views 文件夹是 /
app.set('views','views');
app.set('view engine','ejs');

// session 中间件         
app.use(
    session({
        secret:'hello',
        resave: true,
        saveUninitialized: true,
        cookie:{
            maxAge : 1000*60*60*2
            
        }
    })
);


//处理静态资源托管
app.use(express.static('public'));

//处理 req.body
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


//处理  req.cookies
app.use(cookieParser());


//处理各种路由中间件

//用户相关
app.use('/users',userRouter);
app.use('/posts',postRouter);


app.get('/',(req,res) => {
    res.redirect('/posts');
})

app.listen(3000);