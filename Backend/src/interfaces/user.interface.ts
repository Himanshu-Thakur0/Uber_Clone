import { Document, Types } from "mongoose";

interface name {
    firstName:string,
    lastName:string
}

export interface IUser extends Document {
    _id:Types.ObjectId,
    fullName:name,
    email:string,
    password:string,
    socketId?:string,
    comparePassword: (password: string) => Promise<boolean>;
} 