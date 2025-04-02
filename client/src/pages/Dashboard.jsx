import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    axios.get('https://mern-repo-github-io.onrender.com/authorize/')
      .then((result) => {
        if (result.data.Status === 'Success') {
          setAuth(true)
        } else {
          setAuth(false)
        }
      })
  }, [])
  const handleLogout = () => {
    axios.get('https://mern-repo-github-io.onrender.com/logout/')
    navigate('/')
  }
  return (
    <>
      {
        auth ?
          <div>
            <h1>Welcome</h1>
            <button onClick={handleLogout}>Logout</button>
          </div> :
          <div>
            <h1>Please Login</h1>
            <Link to={`/`}>Login</Link>
          </div>
      }
    </>
  )
}
