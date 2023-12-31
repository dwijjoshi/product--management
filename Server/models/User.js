const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name."]
    },
    email:{
        type:String,
        required:[true,"Please enter an email."],
        unique:[true,'Email already exists.']
    },
    password:{
        type:String,
        required:[true,"Please enter a password."],
        minlength:[6,'Password must be atleast of 6 characters'],
        select:false

    },
    cartProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],

    isAdmin:{
        type:String,
        default:false,
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
  });
  
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
};

module.exports = mongoose.model("User",userSchema)
