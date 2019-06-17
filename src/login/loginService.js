var db = require("../../config/db");

var checkLogin= async function(uname,pwd){
    return await new Promise((resolve,reject)=>{
          db.queryParas("select * from table_user where uname=? and pwd=?",[uname,pwd],function(err,data){
                resolve(data);
            });
        });
}

var addUser = function(uname,pwd,level){
    return new Promise((resolve,reject)=>{
        db.queryParas("insert into table_user(uname,pwd,level) value (?,?,?)",[uname,pwd,level],function(err,data)
        {resolve(data)}
        );
    });
}

module.exports={
    checkLogin,
    addUser
}