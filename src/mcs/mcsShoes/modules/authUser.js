
"use strict";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const httpStatus = require('http-status');
const userModel = require('../../mcs-users/models/user.js')

    dotenv.config()
    exports.authUser = async (call) => {
        let token;
        let response = {
            status: httpStatus.BAD_REQUEST
        };



        token = call.metadata.get('token')[0]


        if (token && token.startsWith('Bearer')) {

            token = token.split(' ')[1]
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = await userModel.findById(decoded.id)
                // call.request.uploadedBy = decoded.id //check for decoded first
                if (userId) {
                    response = {
                        user: userId?.id,
                        status: httpStatus.OK
                    }
                }

                return response;

            } catch (error) {
                return {
                    decoded: error,
                    status: httpStatus.BAD_REQUEST
                }

            }

        }
        else {
            return response
        }

    }



