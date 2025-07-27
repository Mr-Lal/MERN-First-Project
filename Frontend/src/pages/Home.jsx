import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FiSearch } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import TodoCard from '../components/TodoCard';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../socket';

const Home = () => {
  const [query, setQuery] = useState('');
  const [todoData, setTodoData] = useState([]);
  const [editPadOpen, setEditPadOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titlePlaceholder, setTitlePlaceholder] = useState('');
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('');

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/todo/get`, {
          withCredentials: true,
        });
        setTodoData(res.data.todos || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, []);

  useEffect(() => {
    socket.on('addTodo', (item) => {
      setTodoData((prevData) => [...prevData, item]);
    });
    return () => socket.off('addTodo');
  }, []);

  useEffect(() => {
    socket.on('todoDeleted', (id) => {
      setTodoData((prev) => prev.filter((todo) => todo._id !== id));
    });
    return () => socket.off('todoDeleted');
  }, []);

  useEffect(() => {
    socket.on('updatedTodo', (updatedTodo) => {
     
      
      setTodoData((prev) =>
        prev.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    });
    return () => socket.off('updatedTodo');
  }, []);

  const openEditPopup = async (id) => {
    try {
      const res = await axios.get(`${BaseUrl}/todo/spacific/${id}`, {
        withCredentials: true,
      });
      const todo = res.data.todo;
      setEditId(todo._id);
      setTitle(todo.title);
      setDescription(todo.description);
      setTitlePlaceholder(todo.title);
      setDescriptionPlaceholder(todo.description);
      setEditPadOpen(true);
    } catch (error) {
      console.log('Error fetching todo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { title, description, id: editId };
    socket.emit('updatedTodo', updatedData);

    try {
      const res = await axios.put(
        `${BaseUrl}/todo/update/${editId}`,
        { title, description },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setEditPadOpen(false);
        setTitle('');
        setDescription('');
        setEditId(null);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-gray-100">
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
      <h1 className="flex items-center justify-center text-4xl mt-5">All Todos</h1>

      <div className="container lg:w-[928px] sm:w-[500px] w-full mx-auto mt-5 px-4">
        <div className="h-[48px] bg-[#E8E8F2] rounded-lg flex items-center  px-4 gap-2">
          <FiSearch />
          <input
            value={query}
            type="text"
            placeholder="Search..."
            className="w-full h-full outline-none bg-transparent "
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-4">
          {todoData
            .filter((item) =>
              !query || item.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((item, idx) => (
              <div
                key={idx}
                className="relative "
              >
                <TodoCard
                  title={item.title}
                  description={item.description}
                  id={item._id}
                  completed={item.isCompleted}
                />
                <button
                  onClick={() => openEditPopup(item._id)}
                  className="absolute top-4 right-20 text-black hover:text-blue-600 cursor-pointer"
                  title="Edit Task"
                >
                  <FaPen />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <Link to="/add-todo">
        <div className="w-10 h-10 rounded-md bg-[#546bf2] flex items-center justify-center text-white text-2xl fixed bottom-5 right-5 cursor-pointer shadow-lg">
          +
        </div>
      </Link>

      {/* Edit Popup */}
      {editPadOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-[800px] h-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-white mb-6 flex items-center justify-center mt-5 ">Edit the Task</h1>
            <form className="flex flex-col gap-6 mt-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={titlePlaceholder}
                className="w-full h-12 rounded-lg px-4 outline-none border border-gray-300 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <textarea
                placeholder={descriptionPlaceholder}
                className="w-full h-40 rounded-lg px-4 outline-none border border-gray-300 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <div className="flex gap-4 items-center justify-center">
                <button
                  type="submit"
                  className="bg-[#546bf2] w-20 h-10 rounded-md cursor-pointer hover:bg-blue-600 text-white"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditPadOpen(false)}
                  className="bg-red-500 w-20 h-10 rounded-md cursor-pointer  hvoer:bg-red-500 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
