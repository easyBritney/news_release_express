var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType}
   =require('graphql') ;
var db = require("../../../config/db");

const Article = require('../../article/scheme');
const ColumnModel = require('../../column/scheme');
const ColumnService = require('../../column');
const User = require('../../login/scheme');

const UserServer = require('../../login/index');

const Query = new GraphQLObjectType({
  name:'Query',
  fields:{
    column:{
      type:new GraphQLList(ColumnModel.Column),
      args:{
        cname:{
          type:GraphQLString,
        }
      },
      resolve:function(_,args){ //,{ rootValue: { ip,cookie,session } }
        async function test(){
          return await new Promise((resolve,reject)=>{
            db.query("select * from table_column",function(err,data){resolve(data)});
          });
        }
        return test();
      }
    },
    article:{
      type:new GraphQLList(Article),
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
      resolve:function(_,args){ 
        async function test(){
          return await new Promise((resolve,reject)=>{
            db.query("select * from table_article",function(err,data){resolve(data)});
          });
        }
        return test();
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
        return UserServer.checkLogin(userInfo.uname,userInfo.pwd)
        .then((data)=>{
            return new Promise((resolve,reject)=>{
              var user = eval(JSON.stringify(data));
              console.log("data:",data);
              console.log("req:",req);
              if(user[0].uname!=null)
              {
                req.session['uname'] = userInfo.uname;
                req.session['level'] = user[0].level;
                req.session.cookie('level',user[0].level,{
                  path: '/',
                  maxAge: 360,
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
    },
    
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
