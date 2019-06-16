var mysql = require("mysql");
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"NewsManage"
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

function queryParas(sql,paras,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,paras,function(err,rows){
            callback(err,rows);
            connection.release();
        });
    });
}

module.exports = {
    query,
    queryParas
};