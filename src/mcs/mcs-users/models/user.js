const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add email.'],
        unique:true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email.'
        ],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter phone number']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 6,
        select: false //Not gonna send in response
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
   
},{ timestamps: true }
);
// tyo mongo ko _id lai obj ko idma rakhni/banauxa
userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


// Encrypt password using bcryptjs
userSchema.pre('save', async function(next) {
    // This gonna run when password is not changed or mordified.
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// User method using .methods 
userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);