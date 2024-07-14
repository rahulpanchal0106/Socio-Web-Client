import { useState } from 'react'

import './App.css'
import Feed from './components/Feed/Feed'
import Login from './components/Auth/Login'
import Nav from './components/Navbar/Nav'
import checkAuth from './utils/checkAuth'
import {BrowserRouter, Routes, Route, Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home/Home'
import People from './components/People/People'



function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/feed",
      element:<Feed/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/people",
      element:<People/>
    },
  ])

  return (
    <div>
      {/* {
        checkAuth()?
        <>
          <Nav/>
          <Feed/>
        </>
        :<Login/>

      } */}
      {/* <Outlet/> */}
        {/* <Nav/> */}
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
