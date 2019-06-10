var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList}
   =require('graphql') ;
var db = require("../../config/db");

const Column = new GraphQLObjectType({
  name:'Column',
  description:'栏目名称',
  fields:{
    cid:{
      type:GraphQLInt
    },
    cname:{
      type:GraphQLString
    }
  }
});

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
      resolve:function(_,args){
        async function test(){
          return await new Promise((resolve,reject)=>{
            db.query("select * from table_column",function(err,data){resolve(data)});
          });
        }
        return test();
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
