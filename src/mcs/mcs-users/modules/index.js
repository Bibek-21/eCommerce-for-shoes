"use strict";
(()=>{

    module.exports={
        createUser:require('./user-modules/create-user'),
        readUserById:require('./user-modules/read-user-by-id'),
        readAllUsers:require('./user-modules/read-all-users'),
        updateUserById:require('./user-modules/update-user-by-id'),
        deleteUserById:require('./user-modules/delete-user-by-id')
    }

})();