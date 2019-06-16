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

var addUser= function(UserInput,req,res){
  var uname = UserInput.uname;
  var level = UserInput.level;
  var pwd = UserInput.pwd;
  return UserServer.addUser(uname,pwd,level);
  // return articleService.addArticle(uid,articleInput.cid,articleInput.state,articleInput.content,articleInput.title); 
}

module.exports={
  checkLogin,
  getUname,
  addUser
}
