import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FiSearch } from "react-icons/fi";
import TodoCard from '../components/TodoCard';
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import { socket } from '../socket';



const Completed = () => {
    const [quire,setQuire]=useState()
    const [todoData,setTodoData]=useState([])
    
    const token=localStorage.getItem('token')
 

    useEffect(()=>{
    const  fetchTodo=async()=>{
try {
  const res=await axios.get(`https://taskflow123.up.railway.app/todo/get`,{     headers: {
    Authorization: `Bearer ${token}`
  }})
  setTodoData(res.data.todos || [])
  
  
} catch (error) {
  console.log(error);
  
}
    }
    fetchTodo()
    },[])
    
     useEffect(() => {
       socket.on('todoDeleted', (id) => {
         setTodoData((prev) => prev.filter((todo) => todo._id !== id));
       });
       return () => socket.off('todoDeleted');
     }, []);
   
     useEffect(() => {
       socket.on('updatedTodo', (updatedTodo) => {
        
         console.log(updatedTodo);
         
         setTodoData((prev) =>
           prev.map((todo) =>
             todo._id === updatedTodo._id ? updatedTodo : todo
           )
         );
       });
       return () => socket.off('updatedTodo');
     }, []);
    
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
<h1 className='flex items-center justify-center text-4xl mt-5'>Completed Todos</h1>
        <div className='container lg:w-[928px] sm:w-[500px] w-full mx-auto mt-5 px-4'>
            <div className='h-[48px] bg-[#E8E8F2] rounded-lg flex items-center  px-4 gap-2'>
<FiSearch/>
<input value={quire} type="text" placeholder='Search...' className='w-full h-full outline-none' onChange={(e)=>setQuire(e.target.value)}/>
            </div>
        </div>
{
  todoData
    ?.filter(item => {
      const isNotCompleted = item.isCompleted === true;

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

export default Completed