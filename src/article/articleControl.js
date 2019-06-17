var ManagerControl=require('../manager/managerControl');
var EditorControl=require('../editor/eidtorControl');
var ArticleService=require('../article/articleService');

var showArticle = function(args,req){
    console.log(args);
    if(Object.getOwnPropertyNames(args).length>0)
    {
        if(args.uid!=null)
            ;
        else if(args.state!=null){
            if(args.state=='manager')
                return ManagerControl.showArticlePublished(req);
            else if(args.state=='editor')
                return EditorControl.showArticle(req);
        }
        else if(args.cid!=null){
            return ArticleService.showArticleByCid(args.cid);
        }
        else if(args.aid!=null){
            return ArticleService.showArticleDetail(args.aid);
        }
    }
    else{
        return ArticleService.showArticle();
    }
}

module.exports = {
    showArticle
}