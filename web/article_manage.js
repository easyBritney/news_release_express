window.onload = getArticlesPublished();

function getArticlesPublished(){
    $.ajax({
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
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "PUT",  
        url: "http://localhost:10080/manage/article/"+aid+"/"+state ,
        dataType: "json",
        success: function (result,status,xhr) {
            console.log(result); 
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
            window.localStorage.setItem("aid",message);
            window.location.href="article_modify_note.html";
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

$('#rejectModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var aid = button.data('aid');

    document.querySelector('#reject').onclick=function(event){
        changeArticleState(aid,"returned");
    }
})


