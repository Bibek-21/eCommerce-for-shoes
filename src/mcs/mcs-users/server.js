/* 
This is common for all microservices except the
path for proto and modules and port address are different

*/
const express = require("express");
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

//environment file is configured
const envPath = require("../../common/config/config.env");
dotenv.config({ path: envPath });

const userPort = process.env.PORT;
const grpcHost = process.env.GRPC_HOST;

const filePath = `${__dirname}`;
const userPath = require("../../common/proto/user-proto"); //yo ma proto banyera path add gara and remove require function
const userProtoPath = `${filePath}/${userPath}`;

const userPackageDefinition = protoLoader.loadsync(userProtoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});

const server = new grpc.Server();

const userProto = grpc.loadPackageDefiniton(userPackageDefinition);

const userService = require("./modules/index"); // this contains all the user modules that are the part of a service

// we add services into the server here change the proto.rpc service according to the proto we will build and check wheather the proto path is correct and if the data s being triggered or not
server.addService(userProto.example.simpleCrud.rpc.userCrudService.service, {
  create: userService.createUser,
  readById: userService.readUserById,
  readAll: userService.readAllUsers,
  updateById: userService.updateUserById,
  deleteById: userService.deleteUserById,
});

//binding server into the host and port  and starting server at the required port then this port is used by client or user client to help integrate then service in the client
server.bindAsync(
  `${grpcHost}:${userPort}`,
  grpc.ServerCredentials.createInsecure(),
  (err, userPort) => {
    if (err) {
      console.error(`user server error:${err.message}`);
    } else {
      console.log(`user server bound on port ${userPort}`);
      server.start();
    }
  }
);
