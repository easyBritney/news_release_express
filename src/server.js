const express = require('express');
// bodyParser 包用来自动解析请求中的 JSON 数据。
const bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser')
var router = express.Router();

var graphqlHTTP = require('express-graphql');

const schema = require('./schema');

var app = express();

const PORT = 8090
app.listen(PORT, () => {
  console.log(`News server running on port ${PORT}.`)
});

app.use("/",graphqlHTTP({
    schema:schema,
    graphiql:true
}));
