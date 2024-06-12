import mongoose from 'mongoose'
import { string } from 'zod'

const userSchema = mongoose.Schema({
    name: {
        type :  string,
        required : true
    },
    username : {
        type :string,
        required : true,
        unique : true
    },
    password :{
        type: string,
        required : true,
        unique : true
    },
    phoneNumber :{
        type :string,
        required : true,
        unique : true
    },
    confirmPassword :{
        type :string,
        required : true,
        unique : true
    }
})
const User = mongoose.model ('User',userSchema)
export default User