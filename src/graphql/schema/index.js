var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType}
   =require('graphql') ;
var db = require("../../../config/db");

const User = require('../../login/scheme');
const ArticleModel = require('../../article/scheme');
const ColumnModel = require('../../column/scheme');
const ColumnService = require('../../column/columnService');
const UserControl = require('../../login/loginControl');
const EditorControl = require('../../editor/eidtorControl')


const Query = new GraphQLObjectType({
  name:'Query',
  fields:{
    column:{
      type:new GraphQLList(ColumnModel.Column),
      args:{
        cid:{
          type:GraphQLInt,
        },
        cname:{
          type:GraphQLString,
        },
        uname:{
          type:GraphQLString
        }
      },
      resolve:function(_,args){
        async function test(){
          return await new Promise((resolve,reject)=>{
            db.query("select cid,cname,uname from table_column a,table_user b where a.uid=b.uid",function(err,data){resolve(data)});
          });
        }
        return test();
      }
    },
    user:{
      type:User.User,
      args:{
        uname:{
          type:GraphQLString
        }
      },
      resolve:(source,args,req,res)=>{
        return UserControl.getUname(req,res);
      }
    },
    article:{
      type:new GraphQLList(ArticleModel.Article),
      args:{
        aid:{
          type:GraphQLInt
        },
        eid:{
          type:GraphQLInt
        },
        cid:{
          type:GraphQLInt
        },
        state:{
          type:GraphQLString
        },
        title:{
          type:GraphQLString
        }
      },
      resolve:function(_,args,req){ 
        console.log(args);
        
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:()=>({
    addColumn:{
      type:ColumnModel.Column,
      args:{
        columnInfo:{type:ColumnModel.ColumnInput},
      },
      resolve:(source,{columnInfo},{rootValue:{req,res}})=>{
        console.log("cookie:"+req.headers.cookies);
        return ColumnService.addColumn(columnInfo.cname);
      }
    },
    checkLogin:{
      type:User.User,
      args:{
        userInfo:{type:User.UserInput}
      },
      resolve:(source,{userInfo},req,res)=>{
        return UserControl.checkLogin(userInfo,req,res);
      }
    },
    addArticle:{
      type:ArticleModel.Article,
      args:{
        articleInfo:{type:ArticleModel.ArticleInput}
      },
      resolve:(source,{articleInfo},req,res)=>{
        return EditorControl.addArticle(articleInfo,req,res);
      }
    },
    changeState:{
      type:ArticleModel.Article,
      args:{
        articleInfo:{type:ArticleModel.ArticleInput}
      },
      resolve:(source,{articleInfo},req,res)=>{
        return EditorControl.changeState(articleInfo,req,res);
      }
    },
    modifyArticle:{
      type:ArticleModel.Article,
      args:{
        articleInfo:{type:ArticleModel.ArticleInput}
      },
      resolve:(source,{articleInfo},req,res)=>{
        return EditorControl.modifyArticle(articleInfo,req,res);
      }
    }
    
  })
})

function result(status,content){
  this.status = status;
  this.content = content;
}

const Result = new GraphQLObjectType({
  name:"rs",
  fields:{
    status:{
      type:GraphQLString
    },
    content:{
      type:GraphQLString
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation:Mutation
});

module.exports = Schema;
