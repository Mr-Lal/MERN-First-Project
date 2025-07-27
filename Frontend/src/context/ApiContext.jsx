import React, { createContext } from 'react'
import { useState } from 'react'

export const DataContext=createContext()
const ApiContext = ({children}) => {
    const [todoData,setTodoData]=useState([])

  return (

<DataContext.Provider value={{setTodoData,todoData}} >

    {children}

</DataContext.Provider>

  )
}

export default ApiContext