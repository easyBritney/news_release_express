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

var showArticleExpectState= function(state){
    return new Promise((resolve,reject)=>{
          db.queryParas("select aid,a.eid,title,a.state,a.content,a.cid,a.time,b.cid,b.cname,c.uname  from table_article a left join table_column b on(a.cid=b.cid) left join table_user c on (a.eid=c.uid) where a.state not in (?)",[state],function(err,data){
            resolve(data)
        });
    });
}

var showArticleByUid= function(uid){
    return new Promise((resolve,reject)=>{
          db.queryParas("select aid,a.eid,title,a.state,a.content,a.cid,a.time,b.cid,b.cname,c.uname  from table_article a left join table_column b on(a.cid=b.cid) left join table_user c on (a.eid=c.uid) where a.eid=?",[uid],function(err,data){
              resolve(data)
        });
    });
}
 
var showArticleByCid= function(cid){
    return new Promise((resolve,reject)=>{
          db.queryParas("select aid,a.eid,title,a.state,a.content,a.cid,a.time,b.cid,b.cname,c.uname  from table_article a left join table_column b on(a.cid=b.cid) left join table_user c on (a.eid=c.uid) where a.cid=?",[cid],function(err,data){
              resolve(data)
        });
    });
}

var showArticleDetail= function(aid){
    return new Promise((resolve,reject)=>{
          db.queryParas("select aid,a.eid,title,a.state,a.content,a.cid,a.time,b.cid,b.cname,c.uname  from table_article a left join table_column b on(a.cid=b.cid) left join table_user c on (a.eid=c.uid) where a.aid=?",[aid],function(err,data){
              resolve(data)
        });
    }).then((data)=>{
        return new Promise((resolve,reject)=>{
            console.log(data[0].content);
            var detail = eval(JSON.stringify(data));
            detail[0].content = data[0].content.toString('utf8');
            resolve(detail);
        })
    });
}

module.exports={
    addArticle,
    changeState,
    modifyArticle,
    showArticle,
    showArticleExpectState,
    showArticleByUid,
    showArticleByCid,
    showArticleDetail
}