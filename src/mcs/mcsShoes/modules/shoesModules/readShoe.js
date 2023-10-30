"use strict";

const { authUser } = require('../authUser.js'); 
const shoesModel = require('../../models/shoes.js');
const httpStatus = require('http-status');

exports.readShoe = async (call,callback)=>{
    let response ={};

    let userExist = await authUser(call);
    if(userExist.status==200){
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
    else{
        return callback(err,response)
    }

    
}