const {makeExecutableSchema} = require('graphql-tools');

// 在这里定义所有的类型
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

// 根据所有类型来生成模式对象
module.exports = makeExecutableSchema({typeDefs});