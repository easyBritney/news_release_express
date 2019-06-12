const express = require('express');
const graphqlHTTP = require('express-graphql');
const session = require('express-session');
const schema = require('./graphql/schema');
const cors = require('cors');

var app = express();

const corsOption = {
    origin(origin,callback){
        callback(null,true);
    },
    credentials:true
}
const PORT = 8090

function loggingMiddleware(req, res, next) {
    console.log(req.headers.origin);
    console.log(req.headers.cookie);
    console.log(req.session);

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type,Origin,Accept,X-Requested-With,CONTEXTPATH');
    res.header('Access-Control-Allow-Methods', 'POST,GET, OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');

    next();
}
var root = {
    req: function (args, request,response) {
        return request;
    },
    res:function(args,request,response){
        return response;
    },
};

app.use('/web', express.static('../web'));
app.use(cors(corsOption));
app.listen(PORT, () => {
  console.log(`News server running on port ${PORT}.`)
});

app.use(loggingMiddleware);

app.use(session({ 
    secret: 'secret', 
    resave : true,
    saveUninitialized: false,
    cookie: { path:'/',maxAge: 600 }
}));
app.use(loggingMiddleware);

app.use("/",graphqlHTTP({
    schema:schema,
    graphiql:true,
    rootValue: root
}));

