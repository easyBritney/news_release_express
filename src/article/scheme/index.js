var {GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType}
     =require('graphql') ;
     
const Article = new GraphQLObjectType({
    name:'Article',
    description:'文章',
    fields:{
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
      },
      time:{
        type:GraphQLString
      }
    }
  });

  module.exports = Article;