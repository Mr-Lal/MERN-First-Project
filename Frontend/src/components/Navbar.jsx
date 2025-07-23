import React, { useEffect, useState } from 'react'
import iconImg from '../assets/svgIcon.svg'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [userData,setUserData]=useState()

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(()=>{
 const   fetchProfile=async()=>{
      try {
        const res=await axios.get(`${BaseUrl}/user/profile`,{withCredentials:true})

        setUserData(res.data.user)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchProfile()
  },[])

  console.log(userData);
  

  return (
   <nav className=' container  w-full  h-16 flex justify-between px-5 items-center border-b-2 border-[#e8e8f2]'>
<div className='flex items-center gap-2'>
    <img src={iconImg} alt="" className='w-8 px5 h-8' />
    
    <h1 className='text-3xl font-bold'>TaskFlow</h1>
</div>
<div className='flex items-center justify-between gap-10'>
    <ul className='flex gap-10 text-lg font-semibold'>

       <NavLink to={'/'}>  <li className='cursor-pointer hover:text-blue-500 transition-all'>All</li></NavLink>
      <NavLink to={'/active-todo'}>  <li className='cursor-pointer hover:text-blue-500 transition-all'>Active</li></NavLink>
 <NavLink to={'/completed-todo'}>   <li className='cursor-pointer hover:text-blue-500 transition-all'>Completed</li></NavLink> 
    </ul>
    <p className='w-10 h-10 rounded-full bg-gray-400'>
      <img src={userData?.profilePicture} alt="" className='h-full w-full object-center rounded-full'/>
    </p>

</div>
   </nav>
  )
}

export default Navbar