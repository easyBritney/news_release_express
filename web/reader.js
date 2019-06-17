
const { pluck,
    filter,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    map } =  rxjs.operators;


window.onload =  function(){
    console.log(rxjs);
};

function getArticles(cid){
    return new Promise((resolve,reject)=>{
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type: "POST",//方法类型
            url: "http://localhost:8090/graphql" ,//url
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data:JSON.stringify({'query':'{article(cid:'+cid+'){aid,title,uname,time}}'}),
            success: function (result,status,xhr) {
                //resolve(result.data.article);
                var table = document.querySelector("#readertable");
                table.innerText = "";
                for(var i =0;i<result.data.article.length;i++){
                    var t = document.createElement("tr");
                    var title = document.createElement("td");
                    var editor = document.createElement("td");
                    var time = document.createElement("td");
    
                    title.textContent = result.data.article[i].title;
                    editor.textContent = result.data.article[i].uname;
                    time.textContent = formatTime(result.data.article[i].time);
    
                    t.appendChild(title);
                    t.appendChild(editor);
                    t.appendChild(time);
                    t.onclick = showArticle(result.data.article[i].aid);
                    table.appendChild(t);
                }
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        })
    })
    
};


function formatTime(t)
{
    var time = new Date(parseInt(t));
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
}

function showArticle (aid) {
    return function(evnet) {
        console.log(aid);
        window.localStorage.setItem("aid",aid);
        window.location.href = "sample.html";
    }
}


var app = new Vue({
    el:"#page-wrapper",

    domStreams:[
        'chooseColumns$'
    ]
    ,
    methods:{
        showArticle :function(aid) {
            return function(evnet) {
                console.log(aid);
                window.localStorage.setItem("aid",aid);
                window.location.href = "sample.html";
            }
        },
        columnPromise:function(){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: "POST",  
                    url: "http://localhost:8090/graphql" ,
                    dataType: "json",
                    contentType:"application/json;charset=UTF-8",
                    data:JSON.stringify({"query":"{column{cid,cname}}"}),
                    success: function (result,status,xhr) {
                        console.log(result);    
                        app.columns=result.data.column;
                        resolve(result.data.column);
                    },
                    error : function(e) {
                        console.log(e);
                        alert("异常！");
                    }
                })
            })
        }
    },
    subscriptions(){
        return {
            columns$:rxjs.from(this.columnPromise()),
            articles$:this.chooseColumns$.pipe(
                map(e=>e.event.target.attributes[0]),
                pluck('nodeValue'),
                map(e=>getArticles(e)),
            )
        }
    }
});
