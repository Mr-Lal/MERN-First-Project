import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FiSearch } from "react-icons/fi";
import TodoCard from '../components/TodoCard';
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'



const Active = () => {
    const [quire,setQuire]=useState()
    const [todoData,setTodoData]=useState([])
    
        const BaseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(()=>{
    const  fetchTodo=async()=>{
try {
  const res=await axios.get(`${BaseUrl}/todo/get`,{withCredentials:true})
  setTodoData(res.data.todos || [])
  
  
} catch (error) {
  console.log(error);
  
}
    }
    fetchTodo()
    },[])
    
   
    
  return (
    <div className='w-full min-h-screen'>
         <ul className="sm:hidden flex items-center justify-center  gap-10 text-lg font-semibold">
          <NavLink to={'/'}>
            <li className="cursor-pointer hover:text-blue-500 transition-all">All</li>
          </NavLink>
          <NavLink to={'/active-todo'}>
            <li className="cursor-pointer hover:text-blue-500 transition-all">Active</li>
          </NavLink>
          <NavLink to={'/completed-todo'}>
            <li className="cursor-pointer hover:text-blue-500 transition-all">Completed</li>
          </NavLink>
        </ul>
<h1 className='flex items-center justify-center text-4xl mt-5'>Active Todos</h1>
        <div className='container lg:w-[928px] sm:w-[500px] w-full mx-auto mt-5 px-4'>
            <div className='h-[48px] bg-[#E8E8F2] rounded-lg flex items-center  px-4 gap-2'>
<FiSearch/>
<input value={quire} type="text" placeholder='Search...' className='w-full h-full outline-none' onChange={(e)=>setQuire(e.target.value)}/>
            </div>
        </div>
{
  todoData
    ?.filter(item => {
      const isNotCompleted = item.isCompleted === false;

      const matchesQuery = !quire || item.title.toLowerCase().includes(quire.toLowerCase());

      return isNotCompleted && matchesQuery;
    })
    .map((item, idx) => (
      <TodoCard key={idx} title={item.title} description={item.description} id={item._id} completed={item.isCompleted}/>
    ))
}




    </div>
  )
}

export default Active