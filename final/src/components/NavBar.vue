<template>
    
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold" v-text="uname"></strong>
                             </span> 
                                <span class="text-muted text-xs block" v-if="level === 0">管理员<b class="caret"></b></span>
                                <span class="text-muted text-xs block" v-if="level === 1">编辑者<b class="caret"></b></span>
                            </span> </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a v-on:click="logout()">登出</a></li>
                        </ul>
                    </div>
                    <div class="logo-element">
                        IN+
                    </div>
                </li>
                <li><router-link to="/index">
                    <i class="fa fa-th-large"></i> <span class="av-label">主页</span>
                </router-link></li>
                <li v-show="level === 0"><router-link to="/index">
                    <i class="fa fa-diamond"></i> <span class="av-label">栏目管理</span>
                </router-link></li>
                <li v-show="level === 0"><router-link to="/index">
                    <i class="fa fa-magic"></i> <span class="av-label">文章管理</span>
                </router-link></li>

                <li v-show="level === 1"><router-link to="/index">
                    <i class="fa fa-edit"></i> <span class="av-label">文章编辑</span>
                </router-link></li>
                <li v-show="level === 1"><router-link to="/index">
                    <i class="fa fa-sitemap"></i> <span class="av-label">文章管理</span>
                </router-link></li>
                <li><router-link to="/content">
                    <i class="fa fa-desktop"></i> <span class="av-label">文章浏览</span>
                </router-link></li>

            </ul>

        </div>
    </nav>

</template>

<script>
import Vue from 'vue'
export default{
    data() {
        return{
            level:'',
            select:'',
            uname:'游客'
        }
    },
    beforeMount() {
        var self = this;
        var query = `{user{uname}}`;
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type: "POST",//方法类型  
            url: "http://localhost:8090/graphql" ,//url
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data: JSON.stringify({
                query
            }),
            success: function (result,status,xhr) {
                console.log(result);
                if(result.data.user!=null)
                    self.uname=result.data.user.uname;
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        })
        var cookies = document.cookie.split("; ");

        for(var i=0;i<cookies.length;i++){
            var name = cookies[i].split("=")[0];
            if(name==="level")
            {
                self.level = parseInt(cookies[i].split("=")[1]);
            }
        }
        if(self.level === '')
            self.level = 2;
    },
    methods:{
        logout:function() {
            var self = this;
            var query = '{user{uname}}';
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                type: "POST",//方法类型   
                url: "http://localhost:8090/graphql" ,//url
                dataType: "json",
                contentType:"application/json;charset=UTF-8",
                data: JSON.stringify({
                    query
                }),
                success: function (result,status,xhr) {
                    console.log(result);
                    self.$router.push({ path: `/login`})
                },
                error : function(e) {
                    console.log(e);
                    alert("异常！");
                }
            })
        }
    }
}
</script>
