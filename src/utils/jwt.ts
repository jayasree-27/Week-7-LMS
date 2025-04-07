import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {IUser} from "../models/userModel";

dotenv.config();

export const generateToken =(user:IUser) :string =>{
    return jwt.sign(
        {id:user._id, role:user.role},
        process.env.JWT_SECRET as string
    )
}

