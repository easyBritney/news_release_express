(function () {
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
                side_menu.uname=result.data.user.uname;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })

    var nav = document.createElement("nav");

    nav.className = "navbar-default navbar-static-side";
    nav.role = "navigation";
    nav.innerHTML = "<nav class=\"navbar-default navbar-static-side\" role=\"navigation\">\n" +
        "        <div class=\"sidebar-collapse\">\n" +
        "            <ul class=\"nav metismenu\" id=\"side-menu\">\n" +
        "                <li class=\"nav-header\">\n" +
        "                    <div class=\"dropdown profile-element\">\n" +
        "                        <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">\n" +
        "                            <span class=\"clear\"> <span class=\"block m-t-xs\"> <strong class=\"font-bold\" v-text=\'uname\'></strong>\n" +
        "                             </span> " +
        "                               <span class=\"text-muted text-xs block\" v-if=\'level === 0\'>管理员<b class=\"caret\"></b></span>" +
        "                               <span class=\"text-muted text-xs block\" v-if=\'level === 1\'>编辑者<b class=\"caret\"></b></span>"+
        "                             </span> </a>\n" +
        "                        <ul class=\"dropdown-menu animated fadeInRight m-t-xs\">\n" +
        "                            <li><a v-on:click=\'logout()\'>登出</a></li>\n" +
        "                        </ul>\n" +
        "                    </div>\n" +
        "                    <div class=\"logo-element\">\n" +
        "                        IN+\n" +
        "                    </div>\n" +
        "                </li>\n" +
        "                <li >\n" +
        "                    <a href=\"index.html\"><i class=\"fa fa-th-large\"></i> <span class=\"nav-label\">主页</span></a>\n" +
        "                </li>\n" +
        "                <li v-show=\"level === 0\">\n" +
        "                    <a href=\"column_manage.html\"><i class=\"fa fa-diamond\"></i> <span class=\"nav-label\" >栏目管理</span></a>\n" +
        "                </li>\n" +
        "                <li v-show=\"level === 0\">\n" +
        "                    <a href=\"article_manage.html\"><i class=\"fa fa-magic\"></i> <span class=\"nav-label\">文章管理</span></a>\n" +
        "                </li>\n" +
        "\n" +
        "                <li v-show=\"level === 1\">\n" +
        "                    <a href=\"editor.html\"><i class=\"fa fa-edit\"></i> <span class=\"nav-label\">文章编辑</span></a>\n" +
        "                </li>\n" +
        "                <li v-show=\"level === 1\">\n" +
        "                    <a href=\"editor_article_manage.html\"><i class=\"fa fa-sitemap\"></i> <span class=\"nav-label\">文章管理</span></a>\n" +
        "                </li>\n" +
        "\n" +
        "                <li>\n" +
        "                    <a href=\"reader.html\"><i class=\"fa fa-desktop\"></i> <span class=\"nav-label\">文章浏览</span></a>\n" +
        "                </li>\n" +
        "\n" +
        "            </ul>\n" +
        "\n" +
        "        </div>\n" +
        "    </nav>";


    document.querySelector("#wrapper").insertBefore(nav,document.querySelector("#page-wrapper"));
    var side_menu = new Vue({
        el:"#side-menu",
        data:{
            level:'',
            select:'',
            uname:'游客'
        },
        methods:{
            
            logout:function () {
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
                        var win = window;
                        while(win != win.top){
                            win = win.top;
                        }
                        window.location.href="login.html"
                    },
                    error : function(e) {
                        console.log(e);
                        alert("异常！");
                    }
                })
            }
        }
    })

    var cookies = document.cookie.split("; ");

    var win = window;
    while(win != win.top){
        win = win.top;
    }
    for(var i=0;i<cookies.length;i++){
        var name = cookies[i].split("=")[0];
        if(name==="level")
        {
            side_menu.level = parseInt(cookies[i].split("=")[1]);
        }
    }
    if(side_menu.level === '')
        side_menu.level = 2;

})()

