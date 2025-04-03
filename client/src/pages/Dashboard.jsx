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
  const [count, setCount] = useState(0)
  const [banner, setBanner] = useState(true)

  useEffect(() => {
    const data = window.localStorage.getItem('banner', banner)
    setBanner(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('banner', JSON.stringify(banner))
    // window.localStorage.setItem('banner', banner)
    // console.log('banner', banner)
  }, [banner])
  return (
    <>
      {
        auth ?
          <div>
            <h1>Welcome</h1>
            <button><Link to={`/add`}>Add Record</Link></button>
            <button onClick={handleLogout}>Logout</button>

            {banner &&
              <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <button onClick={() => setBanner(false)}>Hide</button>
              </div>
            }
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
          </div> :
          <div>
            <h1>Please Login</h1>
            <Link to={`/`}>Login</Link>
          </div>
      }
    </>
  )
}
