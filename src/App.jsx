import { useState } from 'react'

import './App.css'
import Feed from './components/Feed/Feed'
import Login from './components/Auth/Login'
// import getCookie from './utils/getCookie'

// console.log("*&*^&*^&%^&%^%^% ",getCookie('token'))

function App() {
  

  return (
    <div className="container">
      {/* <Nav/>
      <Post/> */}
      <Login/>
      <br />
      <Feed/>
    </div>
  )
}

export default App
