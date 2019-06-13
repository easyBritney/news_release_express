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

function login(){
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
                    var win = window;
                    while(win != win.top){
                        win = win.top;
                    }
                    //win.location.href = "index.html";
                }
                ;
            },
            error : function(e) {
                console.log(e);
                alert("异常！");
            }
        });
}