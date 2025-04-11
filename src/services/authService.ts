import User, {IUser} from "../models/userModel";
import {generateToken} from "../utils/jwt";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError";

export const registerUser = async (name: string, email: string, password: string,role:string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword ,role});
    return await user.save();
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email }) as IUser;
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401,"Invalid credentials");
    }
  
    const token = generateToken(user);
    return { token , user};
};

