import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8080/authorize/')
      .then((result) => {
        if (result.data.Status === 'Success') {
          setAuth(true)
        } else {
          setAuth(false)
        }
      })
  }, [setAuth])
  const handleLogout = () => {
    axios.get('http://localhost:8080/logout/')
    navigate('/')
  }
  return (
    <>
      {
        auth ?
          <div>
            <h1>Welcome</h1>
            <button><Link to={`/add`}>Add Record</Link></button>
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
