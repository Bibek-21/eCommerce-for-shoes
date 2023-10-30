

"use strict";
const grpc = require('@grpc/grpc-js')
const create = require('grpc-create-metadata')
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
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

    exports.login = async(call,callback)=>{

        let response = {
            status: httpStatus[400],
            token: ''
        };

        try {
            const user = await userModel.findOne({email:call.request.email}).select('+password');

            if(!user){
                return callback(null, response)

            }
            const validUser = await user.matchPassword(call.request.password)
            if(validUser){
                // const meta = create({})
                // const meta = new grpc.Metadata();

                response.status = httpStatus.OK;
                response.token =  jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });

                // meta.add('token', `Bearer ${response.token}`)
                // console.log(meta.getMap())
            }
            return callback(null,response)
            
        } catch (error) {
            return callback(error)
        }


    }

})();
