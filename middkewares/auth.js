// 登录校验中间件

const auth = () => {
    return (req,res,next) => {
        if(!req.session.user){
            res.redirect('/users/login?redire='+ req.originalUrl);
        }else{
            next();
        }
    }
}

module.exports = auth;