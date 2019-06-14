var db = require("../../config/db");

var addArticle= async function(eid,cid,state,content,title){
    return await new Promise((resolve,reject)=>{
          db.queryParas("insert into table_article(eid,cid,state,content,title,time) value(?,?,?,?,?,now());",[eid,cid,state,content,title],function(err,data){
                resolve(data);
            });
        });
}

var changeState = function(aid,state){
    return new Promise((resolve,reject)=>{
        db.queryParas("UPDATE table_article SET state=?,time=now() WHERE aid=?",[state,aid],function(err,data){resolve(data)});
    });
}

var modifyArticle = function(aid,cid,title,content){
    return new Promise((resolve,reject)=>{
        db.queryParas("UPDATE table_article SET cid=?,title=?,content=? where aid=?",[cid,title,content,aid],function(err,data){resolve(data)});
    });
}

var showArticle = function(){
    return new Promise((resolve,reject)=>{
          db.query("select aid,title,a.state,a.content,a.time,b.cname,c.uname  from table_article a left join table_column b on(a.cid=b.cid) left join table_user c on (a.eid=c.uid)",function(err,data){
              resolve(data)
        });
    });
}

module.exports={
    addArticle,
    changeState,
    modifyArticle,
    showArticle
}