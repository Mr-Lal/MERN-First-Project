import React, { useState } from 'react';
import { Eye, EyeOff,  } from 'lucide-react';
import axios from 'axios'
import { useNavigate ,Link} from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors]=useState([])
    const navigate=useNavigate()




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file)
   
  };
    const BaseUrl = import.meta.env.VITE_BASE_URL;



  const handelFormSubmit = async(e) => {
    e.preventDefault();

    
    
const data={name,email,password,profileImage}
    try {

      const res=await axios.post(`${BaseUrl}/user/register`,data, {
        
  headers: {
    'Content-Type': 'multipart/form-data'
  }})
 
      if(res.status===201){
navigate('/login')
      }
      
    } catch (err) {
     if (Array.isArray(err?.response?.data?.errors)) {
  setErrors(err.response.data.errors[0]);
} else {
  setErrors("Something went wrong"); // or show a default message
}
     
     
      
    }
    
  }

  return (
    <div className='container w-[928px] h-full mt-5 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-6'>Create Your Account</h1>

      {/* Profile Image Upload */}
      <div className='mb-4 flex flex-col items-center mt-5'>
        <label htmlFor='profile-image' className='cursor-pointer '>
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt='Profile Preview'
              className='w-24 h-24 rounded-full object-cover border-2 border-gray-300'
            />
          ) : (
            <div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm'>
              Upload
            </div>
          )}
        </label>
        <input
          type='file'
          id='profile-image'
          accept='image/*'
          onChange={handleImageChange}
          className='hidden'

        />
      </div>

      <div className='flex flex-col items-center w-full gap-3 mt-5'>
        <input
        type='text'
        placeholder='Full Name'
        className='w-full max-w-md h-10 mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
        {errors.path=='name'?<p className='text-red-600 '>{errors.msg}</p>:null}


      {/* Email */}
      <input
        type='email'
        placeholder='Email Address'
        className='mb-4 w-full max-w-md h-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
        {errors.path=='email'?<p className='text-red-600 '>{errors.msg}</p>:null}


      {/* Password with Eye Toggle */}
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
          className='absolute right-3  top-2.5 text-gray-500 '
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
<p>i have already account <Link to={'/login'}><span className='text-blue-600 cursor-pointer'>Login</span></Link></p>
      <button className='bg-blue-600 text-white w-1/8 h-10 cursor-pointer px-6 py-2 rounded-lg hover:bg-blue-700'
      onClick={(e) =>handelFormSubmit(e)}>
        Sign Up
      </button>
      </div>
    </div>
  );
};

export default Signup;
