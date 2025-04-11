
import mongoose, {Schema , Document } from "mongoose";


export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:"admin" |"instructor" |"student"
}


const UserSchema : Schema=new Schema ({
    name:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum : ["admin","instructor", "student"],
        default :"student"
    }
});

export default mongoose.model<IUser>("User",UserSchema);

