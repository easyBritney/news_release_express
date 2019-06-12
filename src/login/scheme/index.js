var {GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType}
   =require('graphql') ;
   
const User = new GraphQLObjectType({
  name:'user',
  description:'用户',
  fields:{
    uid:{
      type:GraphQLInt
    },
    uname:{
      type:GraphQLString
    },
    level:{
      type:GraphQLInt
    }
  }
});

const UserInput = new GraphQLInputObjectType({
  name:"UserInput",
  fields:{
    uname:{
      type:GraphQLString
    },
    pwd:{
      type:GraphQLString
    },
    level:{
      type:GraphQLInt
    }
  }
})

module.exports = {
  User,
  UserInput
};