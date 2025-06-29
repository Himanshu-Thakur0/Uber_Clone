import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { ICaptain } from "../interfaces/captain.interface.ts";

const captainSchema = new Schema<ICaptain>(
    {
        fullName: {
            firstName: {
                type: String,
                required: [true, "First Name is required"],
                trim: true,
            },
            lastName: {
                type: String,
                required: [true, "Last Name is required"],
                trim: true,
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "please fill valid email adddress"],
        },
        password: {
            type: String,
            required: [true, "password is mandatory"],
            unique: true,
        },
        socketId: {
            type: String,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
        location: {
            lat: {
                type: Number,
            },
            lngt: {
                type:Number,
            },
        },
        vehicle: {
            vehicleType: {
                type: String,
                enum: ["bike", "car", "auto"],
                default: "bike",
            },
            vehicleNumber: {
                type: String,
                minLength: [3, "Vehicle number must be at least 3 characters long"],
                required: [true, "Vehicle number is required"],
                unique: true,
            },
            vehicleColor: {
                type: String,
                required: [true, "Vehicle color is required"],
                trim: true,
            },
            vehicleModel: {
                type: String,
                required: [true, "Vehicle model is required"],
            },
            capacity:{
                type: Number,
                required: [true, "Vehicle capacity is required"],
                min: [1, "Capacity must be at least 1"],
            }
        },
    },
    { timestamps: true }
);


captainSchema.pre("save" ,async function (next:NextFunction) {
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)

    next()
})

captainSchema.methods.comparePassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}

export const captainModel = mongoose.model("Captains", captainSchema);
