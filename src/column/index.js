var db = require("../../config/db");

var deleteColumn= async function(cid){
    return await new Promise((resolve,reject)=>{
          db.queryParas("DELETE FROM table_column WHERE cid=?",[cid],function(err,data){
                resolve(data);
            });
        });
}

var modifyColumn = function(cid,cname,uid){
    return new Promise((resolve,reject)=>{
        db.queryParas("UPDATE table_column SET cname=?,uid=? WHERE cid=?",[cname,cid,uid],function(err,data){resolve(data)});
    });
}

var addColumn = function(cname,uid){
    return new Promise((resolve,reject)=>{
        db.queryParas("insert into table_column(cname,uid,createtime) value (?,?,now())",[cname,uid],function(err,data){resolve(data)});
    });
}

module.exports={
    deleteColumn,
    modifyColumn,
    addColumn
}