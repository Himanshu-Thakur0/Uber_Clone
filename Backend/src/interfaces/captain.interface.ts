import { Document, Types } from "mongoose";

export interface CaptainInput {
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    socketId?: string;
    isOnline?: boolean;
    isAvailable?: boolean;
    location?: {
        lat?: number;
        lngt?: number;
    };
    vehicle: {
        vehicleType: string;
        vehicleNumber: string;
        vehicleColor: string;
        vehicleModel: string;
        capacity: number;
    };
}

export interface ICaptain extends Document, CaptainInput {
    _id: Types.ObjectId;
    comparePassword?: (password: string) => Promise<boolean>;
}