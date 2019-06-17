var columnService = require('../column/columnService');
var articleService = require('../article/articleService');

function filterLevel(level)
{
    if(level!=0)
        return true;
    else
        return false;
}

var addColumn = function(columnInfo,req,res){
    if(filterLevel(req.session.level))
        return null;
    return columnService.addColumn(columnInfo.cname,req.session.uid);
}

var modifyColumn = function(columnInfo,req,res){
    if(filterLevel(req.session.level))
        return null;
    return columnService.modifyColumn(columnInfo.cid,columnInfo.cname,req.session.uid);
}

var deleteColumn = function(columnInfo,req,res){
    if(filterLevel(req.session.level))
        return null;
    return columnService.deleteColumn(columnInfo.cid);
}

var showArticlePublished = function(req){
    if(filterLevel(req.session.level))
        return null;
    return articleService.showArticle();
}

module.exports={
    addColumn,
    modifyColumn,
    deleteColumn,
    showArticlePublished,
}