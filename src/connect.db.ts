import {connect} from 'mongoose'

export default async function connectDB():Promise<typeof import("mongoose")>{
    return  connect(process.env.DB_URI as string);
}