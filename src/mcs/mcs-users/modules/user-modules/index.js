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
        let response = {};
        try {
            const dbResponse = await userModel.create(call.request);
            if(dbResponse){
                response = dbResponse;
            }
            return callback(null,response)
        } catch (error) {
            return callback(error)
        }



     }

    exports.deleteById= async(call,callback)=>{
        let response = {};
        try {
            const dbResponse = await userModel.deleteOne(call.request.id);
    
            if(dbResponse){
                response.status = http.ok;
                response.message = `Successfully deleted for Id ${call.request.id}`
            }
            return callback(null,response)
            
        } catch (error) {
            return callback(error)
            
        }
    
    }

})();
