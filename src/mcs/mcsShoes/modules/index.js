"use strict";
(()=>{

    module.exports = {
        create : require('./shoesModules/createShoe'),
        readAll : require('./shoesModules/readShoes'),
        read : require('./shoesModules/readShoe'),
        update : require('./shoesModules/updateShoe'),
        delete : require('./shoesModules/deleteShoe')
    }

})();