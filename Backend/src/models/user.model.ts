import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/user.interface.ts";

const userSchema = new Schema<IUser>(
    {
        fullName:{
            firstName:{
                type:String,
                required:[true,'First Name is required'],
                trim:true,
            },
            lastName:{
                type:String,
                required:[true,'Last Name is required'],
                trim:true
            }
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true,
            trim:true,
            match:[/\S+@\S+\.\S+/, "please fill valid email adddress"]
        },
        password:{
            type:String,
            required:[true,"password is mandatory"],
            unique:true,
            select:false
        },
        socketId:{
            type:String
        }
    },
    {timestamps:true}
)

userSchema.pre("save" ,async function (next:NextFunction) {
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)

    next()
})

userSchema.methods.comparePassword = async function (password:string) {
    return await bcrypt.compare(password,this.password)
}



export const userModel = mongoose.model("Users",userSchema)