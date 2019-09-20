const bcryptjs = require('bcryptjs');

//hash( ) 方法对密码进行加密
/* 
let password = '123';

bcryptjs.hash(password,10,(err,data) => {

    console.log(data)
}); */
let password = '123';
let hash = bcryptjs.hashSync(password,10);
console.log(hash);

// 使用 bcryptjs compare方法 用户输入的密码进行校验

bcryptjs.compare(password,'$2a$10$KTMioi3BLC2IEeiIokdNo.mFoA8aJU23QjOKuyyTg.yACm.dhWerS',(err,success) => {
    if(err){
        console.log(校验失败)
    }else{
        if(success){
            console.log('成功');
        }else{
            console.log('不正确');
        }
    }
});