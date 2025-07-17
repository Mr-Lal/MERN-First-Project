import User from "../models/user.model.js";


export const registerService=async({name,email,password})=>{
try {
    const userExists=await User.findOne({email})
    if(userExists){
        throw new Error('User already exists with this email');
    }


    const user=await User.create({name,email,password});

  return user
} catch (error) {
    console.log('Error in registerService:', error.message);
        throw error
}
}