import { required } from "joi";
import mongoose ,{Schema, Document} from "mongoose";

export interface ICourse extends Document{
    title:string,
    description:string,
    instructor:mongoose.Schema.Types.ObjectId,
    studentsEnrolled:mongoose.Schema.Types.ObjectId[],
    assignments:mongoose.Schema.Types.ObjectId[],
}

const CourseSchema:Schema =new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    assignments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment",
    }],
},
{
    timestamps:true,
});


export default mongoose.model<ICourse>("Course", CourseSchema);
