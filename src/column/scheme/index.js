var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType}
   =require('graphql') ;

const Column = new GraphQLObjectType({
  name:'Column',
  description:'栏目名称',
  fields:{
    cid:{
      type:GraphQLInt
    },
    cname:{
      type:GraphQLString
    },
    uname:{
      type:GraphQLString
    }
  }
});

const ColumnInput = new GraphQLInputObjectType({
  name:'ColumnInput',
  fields:{
    cid:{
      type:GraphQLInt
    },
    cname:{
      type:GraphQLString
    }
  }
})

module.exports = {Column,ColumnInput};