"use strict";
(()=>{
    const shoesModel= require('../../models/shoes')
    exports.readShoe = async (call,callback)=>{
        let response ={};
        try {
            const dbResponse = await shoesModel.findById(call.request.id);

            if (dbResponse){
                response = dbResponse;
            }
            return callback(null, response);
        } catch (error) {
            return callback(error);
        }
    }
})();