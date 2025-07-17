import { validationResult } from "express-validator";
import { registerService } from "../services/user.service.js";


export const registerUser=async(req,res)=>{
    try {



if(!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
}
const { name, email, password } = req.body;
const user=await registerService({ name, email, password });

const token=user.generateAuthToken();
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
})

res.status(201).json({msg:'User registered successfully', user,token})
   

    } catch (error) {
        console.log('error on registering user:',error);
        
    }
}