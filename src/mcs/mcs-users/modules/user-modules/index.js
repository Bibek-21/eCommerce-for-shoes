// "use strict";
// (()=>{

//     module.exports={
//         createUser:require('./user-modules/create-user'),
//         readUserById:require('./user-modules/read-user-by-id'),
//         readAllUsers:require('./user-modules/read-all-users'),
//         updateUserById:require('./user-modules/update-user-by-id'),
//         deleteUserById:require('./user-modules/delete-user-by-id')
//     }

// })();





"use strict";

const httpStatus = require('http-status');

(()=>{
const htppstatus = require('http-status')
const userModel = require('../../models/user.js')

    exports.createUser= async (call,callback)=>{

        let response ={}

        try {

            const dbResponse = await userModel.create(call.request);
            if (dbResponse){
                response.status = htppstatus.OK;
                response.message =`Succesfull creation of user`
            }
            return callback(null, response)
            
        } catch (error) {
            callback(error)
            
        }


    }
     exports.readById = async(call,callback)=>{
        let details= {};

        try {
            
            const dbResponse = await userModel.findById(call.request.id)
            if(dbResponse){
                details.id = dbResponse.id;
                details.name = dbResponse.name;
                details.email= dbResponse.email;
                details.role= dbResponse.role;
                details.phoneNumber = dbResponse.phoneNumber;
                details.password = dbResponse.password;
            }
            return callback(null,details)
        } catch (error) {
            return callback(error)
        }


     }

    exports.readAllUsers = async(call,callback)=>{

        let response= {};

        try {
            
            const dbResponse = await userModel.find(call.request)
            if(dbResponse){
                response.details= dbResponse;
            }
            return callback(null,response)
        } catch (error) {
            return callback(error)
        }
        } 



    

    exports.deleteById= async(call,callback)=>{
        let response = {};

    
    
        try {
            const dbResponse = await userModel.findByIdAndRemove(call.request.id);
    
            if(dbResponse){
                response.status = htppstatus.OK;
                response.message = `Successfully deleted for Id ${call.request.id}`
            }
            return callback(null,response)
            
        } catch (error) {
            return callback(error)
            
        }
    
    }


    exports.updateById = async(call, callback)=>{

        let response = {};

        try {
            const dbResponse = await userModel.findByIdAndUpdate(call.request.id, call.request);

            if(dbResponse){
                response.status = httpStatus.OK;
                response.message = `Updated user with id: ${call.request.id}`


            }
            return callback(null,response)
        } catch (error) {
            callback(error)
        }
    }

})();
