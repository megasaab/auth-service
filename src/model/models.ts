import { ObjectId } from "mongoose";

export interface AuthUser {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
}