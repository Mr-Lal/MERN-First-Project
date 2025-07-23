import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FiSearch } from "react-icons/fi";
import TodoCard from '../components/TodoCard';
import {Link} from 'react-router-dom'
import axios from 'axios'
import EditCard from '../components/EditCard';



const Home = () => {
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
    
    // const filterdata=todoData?.filter((item)=>{
    //   return item.title.includes(quire)
    // })
    
    
  return (
    <div className='w-full min-h-screen'>
<h1 className='flex items-center justify-center text-4xl mt-5'>All Todos</h1>

        <div className='main-content container   w-[928px] h-full'>
            <div className='h-[48px] w-[928px]  bg-[#E8E8F2] rounded-lg flex items-center px-4 mt-5 gap-2'>
<FiSearch/>
<input value={quire} type="text" placeholder='Search...' className='w-full h-full outline-none' onChange={(e)=>setQuire(e.target.value)}/>
            </div>
        </div>
{
  todoData
    ?.filter(item => {
  

      const matchesQuery = !quire || item.title.toLowerCase().includes(quire.toLowerCase());

      return  matchesQuery;
    })
    .map((item, idx) => (
      <TodoCard key={idx} title={item.title} description={item.description} id={item._id} completed={item.isCompleted}/>
    ))
}

<Link to='/add-todo'>
<div className="w-10 h-10 rounded-md bg-[#546bf2] flex items-center justify-center text-white text-2xl fixed bottom-5 right-5 cursor-pointer">
    +
</div>
</Link>


    </div>
  )
}

export default Home