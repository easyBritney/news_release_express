
window.onload = getColumns();

function getColumns(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",  
        url: "http://localhost:8090/graphql" ,
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        data:JSON.stringify({"query":"{column{cid,cname,uname}}"}),
        success: function (result,status,xhr) {
            console.log(result);    
            app.columns=result.data.column;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}

var app = new Vue({
    el:"#page-wrapper",
    data:{
        columns:[]
    },
    methods:{
    
    }
})

$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var cid = button.data('cid') // Extract info from data-* attributes
    var cname = button.data('cname')

    var modal = $(this);
    console.log(modal); 

    modal.find('.modal-body a').text(cid);
    modal.find('.modal-body input').val(cname);
})

function saveChanges(element){
    var model = $('#myModal');
    var cname = model.find(".modal-body input").val();
    var cid = model.find(".modal-body a").text();

    var query = `mutation {
        modifyColumn(columnInfo:{cid:`+cid+`,cname:"`+cname+`"}){
            cid,cname
        }
    }`;

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
            getColumns();
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}

function addColumn(){
    var model = $("#myModal2");
    var cname = model.find(".modal-body input").val();

    var query = `mutation {
        addColumn(columnInfo:{cname:"`+cname+`"}){
            cid,cname
        }
    }`;
    console.log(cname);
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
            getColumns();
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}

$('#myModal1').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var cname = button.data('cname');
    var cid = button.data('cid');

    var modal = $(this);
    modal.find('.modal-body h3').text("确定要删除\""+cname+"\"栏目吗？");
    modal.find('.modal-body a').text(cid);
})

function deleteColumn(){
    var model = $("#myModal1");
    
    console.log(model[0]);
    var cid = model.find(".modal-body a").text();
    var query = `mutation {
        deleteColumn(columnInfo:{cid:`+cid+`}){
            cid,cname
        }
    }`;
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
                getColumns();
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })
}
