"use strict";
(()=>{        
    const shoesModel = require('../../models/shoes');

    exports.deleteShoes= async (call,callback)=>{
        let response= {};

        try {
    
            const dbResponse = await shoesModel.delete(call.request.id)

            if(dbResponse){
                response.status= 'ok';
                response.message = `Shoes deleted for id :${call.request.id}`
            }

            return callback(null,response);
        } catch (error) {
            return callback(error)
        }

    }


})();