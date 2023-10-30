const grpc = require("@grpc/grpc-js");
const protoLoader  = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const interceptors = require('grpcjs-interceptors');
const path  = require('path');
const db  = require('../../common/helper/mongodb');
const protect = require('./middleware/authentication.js')

dotenv.config();

const port  = process.env.CARTPORT;
const grpcHost  = process.env.GRPC_HOST;

const protoPath = path.join(process.cwd(), '/src/common/Proto/cartProto/cartProto.rpc.proto')

const userPackageDefinition = protoLoader.loadSync(protoPath,{
    keepCase:true,
    longs: String,
    defaults: true
}
);


const server = interceptors.serverProxy(new grpc.Server());
server.use(protect.authUser)


// const server = new grpc.Server();

const cartProto = grpc.loadPackageDefinition(userPackageDefinition);

const cartService = require('./modules/cartModules/index.js');

server.addService(cartProto.cartProto.cart.rpc.cartCrudService.service,{
    create : cartService.createCart,
    read : cartService.readCart,
    update : cartService.updateCart,
    delete : cartService.deleteCart
})


server.bindAsync(
    `${grpcHost}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log(`cart server error ${err}`)
        }
        else{
            console.log(`Cart server bound at port: ${port}`);
            server.start();
            db.mongoose.connect;
        }
    }
);