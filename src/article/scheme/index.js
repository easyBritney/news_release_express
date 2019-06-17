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
      uid:{
        type:GraphQLInt
      },
      aid:{
        type:GraphQLInt
      },
      uname:{
        type:GraphQLString
      },
      cname:{
        type:GraphQLString
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
      },
      content:{
        type:GraphQLString
      }
    }
  });

  const ArticleInput = new GraphQLInputObjectType({
    name:'ArticleInput',
    fields:{
      title:{
        type:GraphQLString
      },
      content:{
        type:GraphQLString
      },
      aid:{
        type:GraphQLInt
      },
      cid:{
        type:GraphQLInt
      },
      state:{
        type:GraphQLString
      }
    }
  })

  module.exports = {
    Article,
    ArticleInput
  };