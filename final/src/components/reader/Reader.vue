<template>
<div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <span class="m-r-sm text-muted welcome-message">欢迎来到新闻管理后台</span>
                    </li>
                    <li>
                        <a href="login.html">
                            <i class="fa fa-sign-out"></i> 注销
                        </a>
                    </li>
                    <li>
                        <a class="right-sidebar-toggle">
                            <i class="fa fa-tasks"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="row wrapper border-bottom white-bg page-heading" id="columns-button">
            <div class="col-lg-10" id="app">
                <h2>栏目</h2>
                <button class="btn btn-default" v-for="column in columns$" v-stream:click="chooseColumns$" v-bind:cid="column.cid"> {{ column.cname }} </button>
            </div>

        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox float-e-margins">
                        <div class="ibox-content">
                            <div class="table-responsive">
                                <table  class="table table-striped table-bordered table-hover" >
                                    <thead>
                                    <tr>
                                        <th>标题</th>
                                        <th>编辑者</th>
                                        <th>发布时间</th>
                                    </tr>
                                    </thead>

                                    <tbody id="readertable">
                                    <!-- <tr v-for="article in articles$" >
                                        <td v-text="article.title"></td>
                                        <td v-text="article.uname" v-bind:aid="article.aid"></td>
                                        <td v-text="article.time"></td>
                                    </tr> -->
                                

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {from} from 'rxjs'
import Vue from 'vue'
import { pluck,
    filter,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    map }  from 'rxjs/operators'


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

export default{
    domStreams:[
        'chooseColumns$'
    ]
    ,
    methods:{
        showArticle :function(aid) {
            let self=this;
            return function(evnet) {
                console.log(aid);
                window.localStorage.setItem("aid",aid);
                self.$router.push({ path: `/article/${aid}`})
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
        },
        getArticles:function(cid){
        let self=this;
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
                    t.onclick = self.showArticle(result.data.article[i].aid);
                    table.appendChild(t);
                }
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        })
     })
    
    },   
    },
    subscriptions(){
        return {
            columns$:from(this.columnPromise()),
            articles$:this.chooseColumns$.pipe(
                map(e=>e.event.target.attributes[0]),
                pluck('nodeValue'),
                map(e=>this.getArticles(e)),
            )
        }
    }
}
</script>
