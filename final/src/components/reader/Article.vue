<script>
export default{
    
    data(){
        return{
            article:''
        }
    },
    beforeCreate() {
        
        var aid = this.$route.params.aid;
        console.log(aid);
        $.ajax({
            type: "POST",  
            url: "http://localhost:8090/graphql" ,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data:JSON.stringify({"query":"{article(aid:"+aid+"){title,cname,content}}"}),
            success: function (result,status,xhr) {
                this.article=result.data.article[0];
                document.getElementById("content").innerHTML=this.article.content;
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        })
    },
}
</script>

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
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>文章</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="reader.html">栏目</a>
                    </li>
                    <li class="active">
                        <strong>文章管理</strong>
                    </li>

                </ol>

            </div>

        </div>
        <div id="article" class="wrapper wrapper-content  animated fadeInRight article">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <div class="ibox">
                        <div class="ibox-content">
                            <div class="pull-right">
                                <button class="btn btn-white btn-xs" type="button">{{article.cname}}</button>
                            </div>
                            <div class="text-center article-title">
                                <h1 class="text-warning">
                                    {{ article.title }}
                                </h1>
                            </div>
                            <div class="text-center article" id="content">

                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>
