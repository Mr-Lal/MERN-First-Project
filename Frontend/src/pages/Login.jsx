import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader3 } from "react-icons/tb";

const Login = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [errors,setErrors]=useState([])
    const [loader,setLoader]=useState(false)

      const navigate=useNavigate()

        const BaseUrl = import.meta.env.VITE_BASE_URL;
         const handelFormSubmit = async(e) => {

    e.preventDefault();
setLoader(true)
    const data={
      email,
      password
    }
    try {
const res=await axios.post(`${BaseUrl}/user/login`,data,{withCredentials:true})
 console.log(res);
  localStorage.setItem('token',res.data.token)
if(res.status===200){
  setLoader(false)
  navigate('/')
}

      
    } catch (err) {
      console.log(err);
      setLoader(false)
      
    if (Array.isArray(err?.response?.data?.errors)) {
  setErrors(err.response.data.errors[0]);
} else {
  setErrors("Something went wrong"); // or show a default message
}
     
      
    }
    
  }
  return (
    <div>
         <div className='flex flex-col items-center w-full gap-3 mt-5'>
         <h1 className='text-4xl font-bold mb-6'>Welcome To TaskFlow</h1>

     <div className='mt-5 flex flex-col items-center w-full gap-3'>
         <input
        type='email'
        placeholder='Email Address'
        className='mb-4 w-full max-w-md h-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {errors.path=='email'?<p className='text-red-600 '>{errors.msg}</p>:null}

      <div className='relative w-full max-w-md mb-6'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          className='w-full px-4 py-2 h-10 outline-none border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
       {errors.path=='password'?<p className='text-red-600 '>{errors.msg}</p>:null}
        <button
          type='button'
          className='absolute right-3  top-2.5 text-gray-500'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
<p>i am creating new account <Link to={'/signup'}><span className='text-blue-600 cursor-pointer'>Signup</span></Link></p>

      <button className='bg-blue-600 text-white flex items-center justify-center gap-3 w-1/8 h-10 cursor-pointer px-6 py-2 rounded-lg hover:bg-blue-700'
      onClick={(e) =>handelFormSubmit(e)}>
     Log In
     <p className={`text-lg ${loader ? "flex animate-spin" : "hidden"}`}>
       <TbLoader3 />
     </p>
      </button>
     </div>
      </div>
    </div>
  )
}

export default Login