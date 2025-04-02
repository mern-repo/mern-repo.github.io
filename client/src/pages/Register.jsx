import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [values, setValues] = useState('')
  const handleonChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }
  const handleonSubmit = (e) => {
    e.preventDefault()
    // axios.post('https://mern-repo-github-io.onrender.com/register/', values)
    axios.post('https://mern-repo-github-io.onrender.com/register/', values)
      .then((result) => {
        if (result.data.Status === 'Success') {
          navigate('/')
        } else {
          alert(result.data.Message)
        }
      })
      .catch((err) => { console.log(err) })
  }
  return (
    <>
      <h1>Register Page</h1>
      <Link to={`/`}>Login</Link>
      <form onSubmit={handleonSubmit}>
        <input type='text' name='username' onChange={handleonChange} />
        <input type='text' name='password' onChange={handleonChange} />
        <button>Register</button>
      </form>
    </>
  )
}
