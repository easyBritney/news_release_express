const {makeExecutableSchema} = require('graphql-tools');

// �����ﶨ�����е�����
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

// ������������������ģʽ����
module.exports = makeExecutableSchema({typeDefs});