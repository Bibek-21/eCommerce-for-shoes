const express = require("express");
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

//environment file is configured
const envPath= require('../../common/config/config.env');
dotenv.config({path:envPath})


const userPort = process.env.PORT;
const grpcHost =process.env.GRPC_HOST;

const filePath = `${__dirname}`;
const userPath= require('../../common/proto/user-proto') //yo ma proto banyera path add gara and remove require function
const userProtoPath = `${filePath}/${userPath}`

const userPackageDefinition = protoLoader.loadsync(userProtoPath,{
    keepCase:true,
    longs:"string",
    defaults:true
});

const server = new grpc.Server();

const userProto = grpc.loadPackageDefiniton(userPackageDefinition);

const userService= require('./modules/index');


server.addService(userProto.example.simpleCrud.rpc.userCrudService.service,{
    create:userService.createUser,
    readById:userService.readUserById,
    readAll:userService.readAllUsers,
    updateById:userService.updateUserById,
    deleteById:userService.deleteUserById
});


server.bindAsync(
`${grpcHost}:${userPort}`,
grpc.ServerCredentials.createInsecure(),
(err,userPort)=>{
    if(err){
        console.error(`user server error:${err.message}`)
    }
    else{

        console.log(`user server bound on port ${port}`);
        server.start()
    }

}

)