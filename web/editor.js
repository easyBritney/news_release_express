var file;
// var aid;
var cid;
var app = new Vue({
    el:"#page-wrapper",
    data:{
        columns:[],
        cid:''
    },
    methods:{
        getColumnSelected:function(){
            console.log(this.cid) ;
            cid=this.cid
        }
    }
});

window.onload =  function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",//方法类型  
        url: "http://localhost:8090/graphql" ,//url
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data: JSON.stringify({
            'query':'{column{cid,cname}}'
        }),
        success: function (result,status,xhr) {
            console.log(result); 
            app.columns=result.data.column;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
   
};

function save(state){
    var title=document.getElementById("title").value;
    var content=$('#content').summernote('code');
    content = content.replace(/["]/g,"\\\"");
    console.log(content);
    
    var query = `mutation {
        addArticle(articleInfo:{cid:`+cid+
                                `,state:"`+state+`"`+
                                `,title:"`+title+`"`+
                                `,content:"`+content+`"}){
            aid,state
        }
    }`;
    alert(state)
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",  
        url: "http://localhost:8090/graphql",
        dataType: "json",
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data: JSON.stringify({
            query
          }),
        success: function (result,status,xhr) {
            var win = window;
                while(win != win.top){
                    win = win.top;
                }
                win.location.href="editsuccess.html"
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}

function result(status,content){
    this.status = status;
    this.content = content;
}

function  getFile(event) {
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
}

function submit(event) {
    //阻止元素发生默认的行为
    console.log(event);
    event.preventDefault();
    var formData = new FormData();
    formData.append("file", this.file);
    axios.post('http://localhost:10080/editor/uploadpicture', formData)
        .then(function (response) {
            alert(response.data);
            console.log(response);
            window.location.reload();
        })
        .catch(function (error) {
            alert("上传失败");
            console.log(error);
            window.location.reload();
        });
}

