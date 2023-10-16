"use strict";
(()=>{
    //shoes model is  imported
    const shoesModel = require('../../models/shoes.js');
    //createShoes ie insert the shoes into the database
    exports.createShoe=async(call,callback)=>{
        let response= {};
        try {

            let dbResponse = await shoesModel.create(call.request);

            if(dbResponse){
                response.status= 'ok';
                response.message= `Shoes ${call.request.name} has succcessfully inserted into database`;

            }

            return callback(null,response)
            
        } catch (error) {
            return callback(error)
            
        }


    }



    exports.readShoe = async (call,callback)=>{
        let response ={};
        try {
            const dbResponse = await shoesModel.findById(call.request.id);

            if (dbResponse){
                response.id = dbResponse.id;
                response.name = dbResponse.name;
                response.brand = dbResponse.brand;
                response.price = dbResponse.price ;
                response.currency = dbResponse.currency;
                response.averageRating = dbResponse.averageRating;
                response.photo = dbResponse.photo;
                response.description = dbResponse.description;
                response.category = dbResponse.category;
                response.discount = dbResponse.discount;
            }
            return callback(null,response);

        } catch (error) {
            return callback(error);
        }
    }

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

    exports.deleteShoes = async (call, callback) => {
        let response = {};

        try {

            const dbResponse = await shoesModel.findByIdAndRemove(call.request.id)

            if (dbResponse) {
                response.status = 'ok';
                response.message = `Shoes deleted for id :${call.request.id}`
            }

            return callback(null, response);
        } catch (error) {
            return callback(error)
        }

    }
})();