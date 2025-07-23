import React, { useState } from 'react'
import { FaPencilAlt, FaTrash,FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


import axios from 'axios'

const TodoCard = ({ title, description, id,completed }) => {
  const [isChecked, setIsChecked] = useState(false);

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const deleteTodo=async()=>{
    try {
      const res=await axios.delete(`${BaseUrl}/todo/delete/${id}`,{withCredentials:true})
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const completeTodo=async()=>{
    try {
      const res=await axios.put(`${BaseUrl}/todo/${id}/complete`,{withCredentials:true})
   
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='container w-[928px] h-full mt-5 flex items-center justify-between'>
      <div className='flex items-center gap-3'>

       {completed?null: <input
          type="checkbox"
          className='cursor-pointer'
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />}
        <p className='flex flex-col'>
          <span>{title}</span>
          <span className='text-[#7780b1] text-sm '>{description}</span>
        </p>
      </div>

      <div className='flex gap-4 items-center'>
        {completed? <p className='cursor-pointer text-red-500' onClick={()=>deleteTodo()}>
            <FaTrash />
          </p>:isChecked && (
          <p className='cursor-pointer text-red-500' onClick={()=>deleteTodo()}>
            <FaTrash />
          </p>
        )}
        {isChecked && (
          <p className='cursor-pointer text-green-500' onClick={()=>completeTodo()}>
            <FaCheckCircle />
          </p>
        )}
       
      {completed?<p>Completed</p>:  <Link to={`/edit-todo/${id}`}>
          <p className='cursor-pointer'><FaPencilAlt /></p>
        </Link>}
      </div>
    </div>
  )
}

export default TodoCard
