import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [values, setValues] = useState('')
  const handleOnChange = (e: any) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }
  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    // axios.post('https://mern-repo-github-io.onrender.com/Login/', values)
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
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="username" onChange={handleOnChange} />
        <input type="text" name="password" onChange={handleOnChange} />
        <button>Login</button>
      </form>
    </>
  )
}
