/* 
This is common for all microservices except the
path for proto and modules and port address are different

*/
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const db = require('../../common/helper/mongodb.js')

//environment file is configured

dotenv.config();

const port = process.env.PORT;
const grpcHost = process.env.GRPC_HOST;


const protoPath = path.join(process.cwd(),'src/common/Proto/salesProto/salesProto.rpc.proto')


const userPackageDefinition = protoLoader.loadSync( protoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});


const server = new grpc.Server();

const saleProto = grpc.loadPackageDefinition(userPackageDefinition);

const saleService = require("./modules/salesModules/index.js"); // this contains all the user modules that are the part of a service

// we add services into the server here change the proto.rpc service according to the proto we will build and check wheather the proto path is correct and if the data s being triggered or not
server.addService(saleProto.salesProto.sales.rpc.salesCrudService.service, {
create: saleService.createSale,
read: saleService.readSales
});
//binding server into the host and port  and starting server at the required port then this port is used by client or user client to help integrate then service in the client
server.bindAsync(
  `${grpcHost}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`user server error:${err.message}`);
    } else {
      console.log(`user server bound on port ${port}`);
      server.start();
      db.mongoose.connect;
    }
  }
);
