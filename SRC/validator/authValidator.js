 import { z } from 'zod'

export const SignUpValidator = z.object({
    name : z.string(),
    userName : z.string(),
    // email : z.string(),
    phoneNumber : z.string(),
    password : z.string()
    .min (4, { message: 'password should not be less than 4 characters'})
    .max (8, { message: 'password should not exceed 8 characters'}),
    confirmPassword : z.string()
    .min (4, { message: 'password should not be less than 4 characters'})
    .max (8, { message: 'password should not exceed 8 characters'}),

}).required ({message:'please fill all required fields'});

export const signInValidator =z.object({
    userName :z.string(),
    // email :z.string(),
    password :z.string().min(4) .max(8),

}).required ({ message: 'please fill all required fields'});

