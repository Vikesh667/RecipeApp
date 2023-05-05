import React, { useState } from 'react'
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'
const Auth = () => {
  return (
    <div className="auth">
      <Login/>
      <Register/>
      
    </div>
  )
}
export default Auth

const Login=()=>{
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [_,setCookies]=useCookies(["access_token"])
  const navigate=useNavigate()
  const onSubmit=async(e)=>{
    e.preventDefault();
    try{
    const res= await axios.post("https://recipeappnodejs-awlz.onrender.com/auth/login", 
      {username,
        password
      })
      setCookies("access_token",res.data.token)
      window.localStorage.setItem("userID",res.data.userID)
       navigate("/")
    }catch(err){
         console.error(err)
    }
  }
  return(
    <div className="auth-container">
    <Form username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    label="Login"
    onSubmit={onSubmit}
    />
    </div>
  )
}
const Register=()=>{
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
const onSubmit=async(e)=>{
  e.preventDefault();
  try{
    await axios.post("https://recipeappnodejs-awlz.onrender.com/auth/register",
    {username,
      password
    })
    alert("Registration Successfull!")
  }catch(err){
       console.error(err)
  }
}

  return(
    <div className="auth-container">
    <Form username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    label="Register"
    onSubmit={onSubmit}
    />
    </div>
  )
}

const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
  return(
<div className="form-group">
      <form onSubmit={onSubmit}>
        <h2>
          {label}
        </h2>
        <div >
          <label htmlFor='username'>Username:</label>
          <input type='text' id="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
        </div>
        <div >
          <label htmlFor='password'>Password:</label>
          <input type='text' id="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        </div>
        <button type='submit'>{label}</button>
      </form>
    </div>
  )

}