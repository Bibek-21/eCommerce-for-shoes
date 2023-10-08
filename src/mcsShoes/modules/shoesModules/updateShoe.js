"use strict";
(()=>{
    let shoesModel = require('../../models/shoes');

  exports.updateShoe = async(call,callback)=>{
    let response= {};

    try {

        const dbResponse = await shoesModel.findByIdAndUpdate(call.request.id,call.request);

        if(dbResponse){
            response.status ="ok";
            response.message = `Succesfully updated for userId ${call.request.id}`
        }
        return callback(null,response)
    } catch (error) {
        return callback(error)
        
    }
  }

})();