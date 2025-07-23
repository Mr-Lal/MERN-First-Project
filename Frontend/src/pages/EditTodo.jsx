import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [titlePlaceholder,setTitlePlaceholder] = useState('');
  const [descriptionPlaceholder,setDescriptionPlaceholder] = useState('');

  const {id}=useParams('id')
  

  const navigate=useNavigate()

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  

  const handelSubmit =async (e) => {
    e.preventDefault()
    
    try {
      const res=await axios.put(`${BaseUrl}/todo/update/${id}`,{title,description},{withCredentials:true})
      if(res.status===200){
navigate('/')
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
   
    }

    useEffect(()=>{
      const data=async()=>{
           try {
      const res=await axios.get(`${BaseUrl}/todo/spacific/${id}`,{withCredentials:true})
      setTitlePlaceholder(res.data.todo.title)
      setDescriptionPlaceholder(res.data.todo.description)
      
    } catch (error) {
      console.log(error);
      
    }
      }
      data()
    },[])
  return (
    <div className='container w-[928px] h-full mt-5 flex flex-col  items-center justify-between'>
 <h1 className='text-4xl font-bold '>Edit the Task</h1>
    <form className='flex flex-col gap-8 w-full mt-5' >   

        <input type="text" placeholder={titlePlaceholder} className='w-full h-12 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all'
        onChange={(e)=>setTitle(e.target.value)} value={title} />
        <textarea cols={50} type="text" placeholder={descriptionPlaceholder} className='w-full h-60 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all'
        onChange={(e)=>setDescription(e.target.value)}  value={description}/>
       
    </form>
    <button className='bg-[#546bf2] h-10 w-30 rounded-[999px] text-white mt-5 cursor-pointer'
    onClick={(e)=>handelSubmit(e)}>Edit Task</button>
    </div>
  )
}

export default EditTodo