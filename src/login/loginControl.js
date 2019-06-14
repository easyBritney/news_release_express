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
                  maxAge: 1000*60*3,
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

getUname=function(req,res){
  console.log(req.session);
  if(req.session.uname!=null)
    return {uname:req.session.uname};
  else
    return null;
}

module.exports={checkLogin,getUname}
