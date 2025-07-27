import React from 'react'
import Home from './pages/Home'
import AddTodo from './pages/AddTodo'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Protect from './components/ProtectRoute'
import EditTodo from './pages/EditTodo'
import Completed from './pages/CompletedPage'
import Active from './pages/Active'
import { ToastContainer } from 'react-toastify'

const App = () => {


  
  
  return (
    <div>
        <Navbar/>
        <ToastContainer/>

    <Routes>

        <Route path='/'element={
          <Protect>
          <Home />


          </Protect>
      } />
      <Route path='/add-todo' element={<AddTodo />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/edit-todo/:id' element={<EditTodo />} />
      <Route path='/completed-todo' element={<Completed />} />
      <Route path='/active-todo' element={<Active />} />
    </Routes>
    </div>
  )
}

export default App