const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');


//environments

dotenv.config({envPath})

//protoPath 
const mainPath = `${__dirname}`
const tempPath = `./proto/shoesProto/shoesProto.rpc.proto`

const protoPath = `${mainPath}/${tempPath}`

//definiing proto package /file
const packageDefinition = protoLoader.loadSync(protoPath,{
    keepcase:true,
    longs:String,
    defaults:true,
});

//load proto
const shoesProto = grpc.loadPackageDefinition (packageDefinition);


const server= new grpc.Server()

//define service 

const shoesService = require('./modules/index')

//add service on the grpc server
server.addService(shoesProto.shoesProto.proto.rpc.shoesCrud.services,{

    create: shoesService.create,
    readAll: shoesService.readAll,
    read : shoesService.read,
    update : shoesService.update,
    delete : shoesService.delete 

})

server.bindAsync(
    `${grpcHost}:${port}`,
    grpc.serverCredentials.createUnsecure(),
    (err,port)=>{
        if(err){
            console.log(`Server error ${err.message}`);

        }
        else{
            console.log(`Server started at port ${port}`);
            server.start();
        }
    }

)