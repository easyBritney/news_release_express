var columnService = require('../column/columnService');
var articleService = require('../article/articleService');

var addColumn = function(columnInfo,req,res){
    return columnService.addColumn(columnInfo.cname,req.session.uid);
}

var showArticlePublished = function(req){
    if(req.session.level!=0)
        return null;
    return articleService.showArticle()
    .then((data)=>{
        return new Promise((resolve,reject)=>{
            resolve(data["published"]);
        }
    )})
}

