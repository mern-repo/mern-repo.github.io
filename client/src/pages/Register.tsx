import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [values, setValues] = useState('')
  const handleOnChange = () => { }
  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    axios.post('https://mern-repo-github-io.onrender.com/register/', values)
    navigate('/')
  }
  return (
    <>
      <h1>Register Page</h1>
      <Link to={`/`}>Login</Link>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="username" onChange={handleOnChange} />
        <input type="text" name="password" onChange={handleOnChange} />
        <button>Register</button>
      </form>
    </>
  )
}
