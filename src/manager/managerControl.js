var columnService = require('../column/columnService');

var addColumn = function(columnInfo,req,res){
    return columnService.addColumn(columnInfo.cname,req.session.uid);
}

