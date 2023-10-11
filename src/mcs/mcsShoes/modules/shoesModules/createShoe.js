"use strict";
(()=>{
    //shoes model is  imported
    const shoesModel = require('../../models/shoes');
    //createShoes ie insert the shoes into the database
    exports.createShoes=async(call,callback)=>{
        let response= {};
        try {

            let dbResponse = shoesModel.create(call.request);

            if(dbResponse){
                response.status= 'ok';
                response.message= `Shoes ${call.request.name} has succcessfully inserted into database`;

            }

            return callback(null,response)
            
        } catch (error) {
            return callback(error)
            
        }


    }
})();