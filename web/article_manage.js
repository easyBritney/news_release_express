window.onload = getArticlesPublished();

function getArticlesPublished(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",//方法类型  
        url: "http://localhost:8090/graphql" ,//url
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data: JSON.stringify({
            'query':'{article(state:"manager"){aid,title,cname,uname,state}}'
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
function changeArticleState(aid,state){
    var query = `mutation {
        changeState(articleInfo:{aid:`+aid+`,state:"`+state+`"}){
            aid,state
        }
    }`;
    alert(state)
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
            getArticlesPublished();
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
            // alert(message);
            // window.localStorage.setItem("aid",message);
            // window.location.href="article_modify_note.html";
            window.localStorage.setItem("aid",message);
            window.location.href = "sample.html";
        }
    }
});

$('#allowModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var aid = button.data('aid');

    document.querySelector('#allow').onclick=function(event){
        changeArticleState(aid,"checked");
    }
})
$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var aid = button.data('aid') 

    document.querySelector('#delete').onclick=function(event){
        changeArticleState(aid,"deleted");
    }
})
