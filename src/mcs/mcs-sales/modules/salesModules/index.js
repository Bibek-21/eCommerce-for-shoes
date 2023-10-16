const httpStatus = require('http-status');
const salesModule = require('../../models/sales.js');

(()=>{
exports.createSale = async (call,callback)=>{
    let response = {};

    try {
        const dbResponse = await salesModule.create(call.request);


    if(dbResponse){
        response.status = httpStatus.OK;
        response.message = `Sales created successfully`
    }

    return callback(null,response);
    } catch (error) {
        return callback(error);
    }
}


exports.readSales = async(call,callback)=>{
    let response= {};
    try {
        const dbResponse = await salesModule.findById(call.request.userId)
    } catch (error) {
        return callback(error)
    }
}
})();