import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const AddTodo = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');

  const navigate=useNavigate()

  const BaseUrl = import.meta.env.VITE_BASE_URL;
// should log the URL

  

  const handelSubmit =async (e) => {
    e.preventDefault()
    
    try {
      const res=await axios.post(`${BaseUrl}/todo/add`,{title,description},{withCredentials:true})
      if(res.status===201){
navigate('/')
      }
      
      socket.emit('add_todo', res.data.todo)
      
    } catch (error) {
      console.log(error);
      
    }
    
   
    }
  return (
    <div className='container w-[928px] h-full mt-5 flex flex-col  items-center justify-between'>
 <h1 className='text-4xl font-bold '>Add New Task</h1>
    <form className='flex flex-col gap-8 w-full mt-5' >   

        <input type="text" placeholder='Task Title' className='w-full h-12 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all'
        onChange={(e)=>setTitle(e.target.value)} value={title} />
        <textarea cols={50} type="text" placeholder='Task Description' className='w-full h-60 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all'
        onChange={(e)=>setDescription(e.target.value)}  value={description}/>
       
    </form>
    <button className='bg-[#546bf2] h-10 w-30 rounded-[999px] text-white mt-5 cursor-pointer'
    onClick={(e)=>handelSubmit(e)}>Add Task</button>
    </div>
  )
}

export default AddTodo