import { Document } from "mongoose";

interface name {
    firstName:string,
    lastName:string
}

export interface UserInput extends Document {
    fullName:name,
    email:string,
    password:string
}