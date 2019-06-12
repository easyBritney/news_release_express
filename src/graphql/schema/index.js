var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType}
   =require('graphql') ;
var db = require("../../../config/db");
var login =require("../../login");

const Article = require('../../article/scheme');
const Column = require('../../column/scheme');
const User = require('../../login/scheme');

const UserServer = require('../../login/index');

const Query = new GraphQLObjectType({
  name:'Query',
  fields:{
    column:{
      type:new GraphQLList(Column),
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

const ColumnInput = new GraphQLInputObjectType({
  name:"ColumnInput",
  fields:{
    cname:{type:new GraphQLNonNull(GraphQLString)}
  }
})

const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:()=>({
    addColumn:{
      type:Column,
      args:{
        columnInfo:{type:ColumnInput},
      },
      resolve:(source,{columnInfo},{rootValue:{cookie}})=>{
        console.log("cookie:"+cookie);
        console.log(columnInfo);
      }
    },
    checkLogin:{
      type:new GraphQLList(User.User),
      args:{
        userInfo:{type:User.UserInput}
      },
      resolve:(source,{userInfo},{rootValue})=>{
        return UserServer.checkLogin(userInfo.uname,userInfo.pwd);
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
