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

function register(){
    var info=$('#registermassage').serializeJSON();
    var level=0;
    if (info['choice']=== 'manager')
        level=0;
    else if (info['choice']=== 'editor')
        level=1; 
    if(info["lusername"]===""||info["lpwd"]===""||info["lpwd1"]==="")
        alert("用户名和密码不能为空")
    else if(info['lpwd']!==info['lpwd1'])
        alert("输入的密码不相同");
    else{
        var query = `mutation {
            addUser(userInfo:{uname:"`+info['lusername']+`",pwd:"`+info['lpwd']+`",level:`+level+`}){
                uname
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
                    if (result.data.addUser != null) {
                        var win = window;
                        while(win != win.top){
                            win = win.top;
                        }
                        win.location.href = "login.html";
                    }
                    ;
                },
                error : function(e) {
                    console.log(e);
                    alert("异常！");
                }
        });
    }
}