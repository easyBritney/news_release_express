window.onload =  function(){
    var aid = window.localStorage.getItem("aid");
    window.localStorage.removeItem("aid")
    console.log(aid);
    $.ajax({
        type: "POST",  
        url: "http://localhost:8090/graphql" ,
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data:JSON.stringify({"query":"{article(aid:"+aid+"){title,cname,content}}"}),
        success: function (result,status,xhr) {
            app.article=result.data.article[0];
            document.getElementById("content").innerHTML=app.article.content;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
};
var app = new Vue({
    el:"#article",
    data:{
        article:[]
    }
});
