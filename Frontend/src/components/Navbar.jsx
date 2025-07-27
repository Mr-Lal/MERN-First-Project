import React, { useEffect, useState, useRef } from 'react';
import iconImg from '../assets/svgIcon.svg';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/user/profile`, {
          withCredentials: true,
        });
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
    const res=  await axios.get(`${BaseUrl}/user/logout`, { withCredentials: true });
      if(res.status===200){
        setShowDropdown(false);
      localStorage.removeItem('token')
        navigate('/login')
      }
      
    } catch (err) {
      
      console.log(err);
    }
  };
    useEffect(() => {
   

    socket.on('profileInfo', (data) => {
      setUserData(data)
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <nav className="container w-full h-16 flex justify-between px-5 items-center border-b-2 border-[#e8e8f2] relative">
      <div className="flex items-center gap-2">
        <img src={iconImg} alt="icon" className="w-8 h-8" />
        <h1 className="text-3xl font-bold">TaskFlow</h1>
      </div>

      <div className="flex items-center justify-between gap-10">
        <ul className="md:flex hidden gap-10 text-lg font-semibold">
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

        {/* Profile Avatar */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={userData?.profilePicture}
              alt="profile"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
         

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-14 w-64 bg-white shadow-lg rounded-md p-4 backdrop-blur-md z-50">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userData?.profilePicture}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold">{userData?.name}</p>
                  <p className="text-sm text-gray-600">{userData?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
