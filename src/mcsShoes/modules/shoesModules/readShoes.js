"use strict";
(()=>{
    const shoesModel =require('../../models/shoes')
    exports.readShoes = async(call,callback)=>{
        let response = {};
        try {
            const dbResponse = await shoesModel.find(call.request)
            if(dbResponse && dbResponse.length>0){
                response.details = dbResponse;

            }

            return callback(null,response);
        } catch (error) {
            return callback(error)
        }
    }
})();