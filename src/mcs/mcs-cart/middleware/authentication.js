
"use strict";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const httpStatus = require('http-status');
const userModel = require('../../mcs-users/models/user.js')

    dotenv.config()
    exports.authUser = async (call,next,callback) => {
        let token;
        
        token = await call.call.metadata.get('token')[0]
       

        if (token && token.startsWith('Bearer')) {

            token = token.split(' ')[1]
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = await userModel.findById(decoded.id)
                // call.request.uploadedBy = decoded.id //check for decoded first
                if (userId) {
                    return await next();
                }
                else{
                    callback(new Error('Not verified user'))
                }

                

            } catch (error) {
                return callback(error)

            }

        }
        else{
            return callback(new Error( 'Token not provided'))
        }

    }


    exports.auth = async(call,next,callback)=>{
       try {
        if(true){
            console.log('I am authenticated');
        }
        await next();
        console.log('after the rpc call');
       
       } catch (error) {
        return callback(new Error({ status: httpStatus.BAD_REQUEST, message: 'not verified token' } ))
       }


    }



