import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  axios.defaults.withCredentials = true
  return (
    <>
      <h1>Login Page</h1>
      <Link to={`/register`}>Register</Link>
    </>
  )
}
