<template>
<div class="loginColumns animated fadeInDown">

        <div class="row">

            <div class="col-md-6">
                <h2 class="font-bold">欢迎登录新闻管理系统</h2>

                <p>真正的勇士,敢于直面惨淡的人生,敢于正视淋漓的鲜血
                </p>
                <p>—— 鲁迅</p>

            </div>
            <div class="col-md-6">
                <div class="ibox-content">
                    <form class="m-t" role="form" id="form1">
                        <div class="form-group">
                            <input type="text" class="form-control" name="uname" placeholder="用户名" required="">
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" name="pwd" placeholder="密码" required="">
                        </div>
                        <button type="button" class="btn btn-primary block full-width m-b" v-on:click="login">登录</button>

                        <a href="forgot_password.html">
                            <small>忘记密码?</small>
                        </a>

                        <p class="text-muted text-center">
                            <small>还没有账号?</small>
                        </p>
                        <a class="btn btn-sm btn-white btn-block" href="register.html">创建一个帐户</a>
                    </form>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-6">
               <small>DoubleFish小组</small>
            </div>
        </div>
    </div>
</template>

<script>
$.fn.serializeJSON = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

export default{
    methods: {
        login:function(){
    var self = this;
    var info=$('#form1').serializeJSON();
    var query = `mutation {
        checkLogin(userInfo:{uname:"`+info['uname']+`",pwd:"`+info['pwd']+`"}){
            uname,level
        }
    }`;
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
                if (result.data.checkLogin != null) {
                    self.$router.push({ path: `/index`})
                }
                ;
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        });
    }
    },

}
</script>
