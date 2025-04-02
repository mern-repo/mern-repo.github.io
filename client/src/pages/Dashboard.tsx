import axios from 'axios'

export default function Dashboard() {
  axios.defaults.withCredentials = true
  return (
    <div>Dashboard</div>
  )
}
