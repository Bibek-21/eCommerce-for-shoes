const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');
const path = require('path')
const db = require('../../common/helper/mongodb.js')
const authUser  = require('./modules/authUser.js')
//environments

dotenv.config({})

const port = process.env.SHOESPORT;
const grpcHost = process.env.GRPC_HOST;

// const meta = new grpc.Metadata();

// const preInterceptor = async()



//protoPath 
const protoPath = path.join(process.cwd(),`/src/common/Proto/shoesProto/shoesProto.rpc.proto`);

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

const shoesService = require('./modules/shoesModules/index.js')

//add service on the grpc server
server.addService(shoesProto.shoesCrud.proto.rpc.shoesCrudService.service,  {
    create : shoesService.createShoe,
    read : shoesService.readShoe,
    readAll: shoesService.readShoes,
    update : shoesService.updateShoe,
    delete : shoesService.deleteShoes
    
})

server.bindAsync(
    `${grpcHost}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log(`Server error ${err.message}`);

        }
        else{
            console.log(`Server started at port ${port}`);
            server.start();
            db.mongoose.connect;
        }
    }

)