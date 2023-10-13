"use strict";
(()=>{
    const mongoose = require('mongoose');
    const config= require('../config/config')

    let db ={}

    db.mongoose= mongoose;
    db.URI = config.URI;
    db.users= require('../../mcs/mcs-users/models/user.js')(mongoose)


    db.mongoose
    .connect(db.URI)
    .then(()=>{
        console.log("connected to Database!");
    })
    .catch((err)=>{
        console.log("cannot connet to the Database!");
        process.exit()
    });

    module.exports=db



})();