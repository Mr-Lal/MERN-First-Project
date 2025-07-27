import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../socket';
import { DataContext } from '../context/ApiContext';

const EditTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titlePlaceholder, setTitlePlaceholder] = useState('');
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
const token=localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://taskflow123.up.railway.app/todo/spacific/${id}`, {
              headers: {
    Authorization: `Bearer ${token}`
  }
        });

        const todo = res.data.todo;
        setTitlePlaceholder(todo.title);
        setDescriptionPlaceholder(todo.description);
        setTitle(todo.title);
        setDescription(todo.description);
      } catch (error) {
        console.log('Error fetching todo:', error);
      }
    };

    fetchData();
  }, [id]);

  // Handle real-time update
  

  var data={
    title,
    id,
    description
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
        socket.emit('updatedTodo',data );

    try {
      const res = await axios.put(
        `https://taskflow123.up.railway.app/todo/update/${id}`,
        { title, description },
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Emit updatedTodo event to all clients
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container w-[928px] h-full mt-5 flex flex-col items-center">
      <h1 className="text-4xl font-bold">Edit the Task</h1>
      <form
        className="flex flex-col gap-8 w-full mt-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={titlePlaceholder}
          className="w-full h-12 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          placeholder={descriptionPlaceholder}
          className="w-full h-60 rounded-lg px-4 outline-none border-2 border-gray-300 focus:border-blue-500 transition-all"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          type="submit"
          className="bg-[#546bf2] h-10 w-32 rounded-[999px] text-white mt-5 cursor-pointer"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
