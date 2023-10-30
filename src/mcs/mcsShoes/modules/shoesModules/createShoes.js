"use strict";

const { authUser } = require('../authUser.js'); 
const shoesModel = require('../../models/shoes.js');
const httpStatus = require('http-status');

exports.createShoe=async(call,callback)=>{
    let response= {};
    let userExist = await authUser(call)
    if(userExist.status == 200){
        call.request.up
    try {



        let dbResponse = await shoesModel.create(call.request);

        if(dbResponse){
            response.status= httpStatus.OK ;
            response.message= `Shoes ${call.request.name} has succcessfully inserted into database`;

        }

        return callback(null,response)
        
    } catch (error) {
        return callback(error)
        
    }
}
else{
    response.status= httpStatus.BAD_REQUEST;
    response.message= `Could not create shoes token not verified`;
    return callback(null,response)
}


}