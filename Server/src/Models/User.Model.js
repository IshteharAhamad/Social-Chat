import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({
  path:'./.env'
})
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      index: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true
    },
    password:{
      type:String,
      required:[true,"Password is required"],
    },
    firstname:{
      type:String,
      trim:true,
    },
    lastname:{
      type:String,
      trim:true
    },
    image:{
      type:String
    },
    color:{
      type:Number,
    },
    isUser:{
      type:Boolean,
      default:false
    },
    refreshToken: {
      type: String,
      default: null,
    },
  
  },
  {
    timestamps: true,
  }
);
UserSchema.pre('save',async function(next){
  if (!this.isModified("password")) return next(); // if password not change then return same password
  this.password = await bcrypt.hash(this.password, 10); /// hashing the password, change password, forgot password
  next();
})
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
