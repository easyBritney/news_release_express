const UserServer = require('./loginService');

var checkLogin=function(userInfo,req,res){
    return UserServer.checkLogin(userInfo.uname,userInfo.pwd)
        .then((data)=>{
            return new Promise((resolve,reject)=>{
              var user = eval(JSON.stringify(data));
              console.log("data:",data);
              if(user[0].uname!=null)
              {
                req.session['uname'] = userInfo.uname;
                req.session['level'] = user[0].level;
                req.session['uid']   = user[0].uid;
                req.res.cookie('level',user[0].level,{
                  path: "/",
                  maxAge: 60*6,
                });
                
                console.log(req.session);
                resolve(user[0]);
              } 
              else{
                resolve(null);
              }
            });
    });
}

module.exports={checkLogin}
