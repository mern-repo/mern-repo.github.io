import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [values, setValues] = useState('')
  const handleonChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }
  const handleonSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/login/', values)
      .then((result) => {
        if (result.data.Status === 'Success') {
          navigate('/dashboard')
        } else {
          alert(result.data.Message)
        }
      })
      .catch((err) => { console.log(err) })
  }
  return (
    <>
      <h1>Login Page</h1>
      <Link to={`/register`}>Register</Link>
      <form onSubmit={handleonSubmit}>
        <input type='text' name='username' onChange={handleonChange} />
        <input type='text' name='password' onChange={handleonChange} />
        <button>Login</button>
      </form>
    </>
  )
}
