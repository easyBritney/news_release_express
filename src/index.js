const express = require('express');
// bodyParser 包用来自动解析请求中的 JSON 数据。
const bodyParser = require('body-parser');
var db = require("../config/db");

// apollo-server-express 包将根据模式来处理 GraphQL 服务器的请求并返回响应。
const {graphqlExpress} = require('apollo-server-express');

const schema = require('./schema');

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

const PORT = 8090
app.listen(PORT, () => {
  console.log(`News server running on port ${PORT}.`)
});