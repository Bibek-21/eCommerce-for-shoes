const httpStatus = require('http-status');
const cartModel = require('../../models/cart.js');


exports.createCart = async(call,callback)=>{
    let response = {}
    try {
        const dbResponse = await cartModel.create(call.request);
        if(dbResponse){
            response.status = httpStatus.OK;
            response.message = 'Cart Created Successfully'

        }
        return callback(null,response)
    } catch (error) {
        return callback(error)
    }

}

exports.readCart = async(call,callback)=>{
    let response = {};
    try {
        const dbResponse = await cartModel.findById(call.request.id);
        console.log(dbResponse);
        // if(dbResponse){
            
        //     response.userId = dbResponse.userId;
        //     response.products = dbResponse.products

        // }

        if(dbResponse){
            response.userId  = dbResponse.userId;
            response.productId = dbResponse.products[0].productId;
            response.quantity = dbResponse.products[0].quantity;
            response.name = dbResponse.products[0].name;
            response.price = dbResponse.products[0].price
        }

        return callback(null, response);
    } catch (error) {
        return callback(error)
    }
}



exports.updateCart = async(call,callback)=>{

    let response = {};

    try {
        const dbResponse  =  await cartModel.findOneAndUpdate({userId:call.request.userId},call.request);
        if(dbResponse){
            response.status = httpStatus.OK;
            response.message = `cart of user ${call.request.userId} updated`
        }
        return callback(null,response);
    } catch (error) {
        return callback(error)
    }
}

exports.deleteCart = async(call,callback)=>{
    let response = {};
    try {
        const dbResponse = await cartModel.findByIdAndRemove(call.request.id);
        if(dbResponse){
            response.status = httpStatus.OK;
            response.message = `Deleted cart successfully for cart ${call.request.id}`
        }
        return callback(null,response);
    } catch (error) {
       return callback(error) 
    }
}

