window.onload = function(){
    var level;
    var cookies = document.cookie.split("; ");
    
    var win = window;
    while(win != win.top){
        win = win.top;
    }                   
    for(var i=0;i<cookies.length;i++){
        var name = cookies[i].split("=")[0];
        if(name==="level")
        {
        level = parseInt(cookies[i].split("=")[1]);
        
        if(level!=1)
            win.location.href="login.html";
        }
    }
    if(level == undefined)
        win.location.href="login.html";
    else{
        getEditorArticles();
    }
}

function changeArticleState(aid,state){
    var query = `mutation {
        changeState(articleInfo:{aid:`+aid+`,state:"`+state+`"}){
            aid,state
        }
    }`;
    // alert(aid,state)
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",  
        url: "http://localhost:8090/graphql",
        dataType: "json",
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data: JSON.stringify({
            query
          }),
        success: function (result,status,xhr) {
            getEditorArticles();
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}


function getEditorArticles(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",//方法类型  
        url: "http://localhost:8090/graphql" ,//url
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data: JSON.stringify({
            'query':'{article(state:"editor"){aid,title,cname,uname,state}}'
        }),
        success: function (result,status,xhr) {
            console.log(result);    
            app.articles=result.data.article;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}

var app = new Vue({
    el:"#page-wrapper",
    data:{
        articles:[]
    },
    methods:{
        setAid: function (message) {
            window.localStorage.setItem("aid",message);
            window.location.href = "sample.html";
        }
    }
})

$('#publishModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var aid = button.data('aid') 

    document.querySelector('#allow').onclick=function(event){
        changeArticleState(aid,"published");
    }
})

$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var aid = button.data('aid') 

    document.querySelector('#delete').onclick=function(event){
        changeArticleState(aid,"deleted");
    }
})