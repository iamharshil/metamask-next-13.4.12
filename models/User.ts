import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    username: string,
    email: string,
    createdAt: Date
}


const UserSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);