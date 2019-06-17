var articleService = require('../article/articleService');

function filterLevel(level)
{
    if(level!=1)
        return true;
    else
        return false;
}
var addArticle= function(articleInput,req,res){
    var uid = req.session.uid;
    var level = req.session.level;
    if(filterLevel(level))
        return null;
    return articleService.addArticle(uid,articleInput.cid,articleInput.state,articleInput.content,articleInput.title); 
}

var changeState = function(articleInput,req,res){
    var level = req.session.level;
    if(filterLevel(level))
        return null;
    return articleService.changeState(articleInput.aid,articleInput.state);
}

var modifyArticle = function(articleInput,req,res){
    var uid = req.session.uid;
    var level = req.session.level;
    if(filterLevel(level))
        return null;
    return articleService.modifyArticle(articleInput.aid,articleInput.cid,articleInput.title,articleInput.content);
}

var showArticle = function(req){
    var uid = req.session.uid;
    var level = req.session.level;
    if(filterLevel(level))
        return null;
    return articleService.showArticleByUid(uid);
}

module.exports={
    addArticle,
    changeState,
    modifyArticle,
    showArticle
}