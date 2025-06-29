import { CaptainInput } from "../interfaces/captain.interface.ts";
import { captainModel } from "../models/captain.model.ts";
import { ApiError } from "../utils/ApiError.ts";



export const createCaptain = async (captainData:CaptainInput) => {
    const session = await captainModel.startSession();
    session.startTransaction();

    try {

        const newCaptain = await captainModel.create(
            [captainData],
            { session }
        );

        console.log("captain created successfully", newCaptain);

        await session.commitTransaction();
        session.endSession();

        return newCaptain
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(500,"Failed to create captain");
    }


}
