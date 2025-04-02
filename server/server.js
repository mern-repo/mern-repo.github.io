import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import cookieParser from 'cookie-parser'
// import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import 'dotenv/config'

const app = express()
const salt = 10
const PORT = process.env.PORT

// LOCAL DB
const db_ = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react2'
})

// HOSTGATOR DB
const db = mysql.createConnection({
  host: '192.185.17.41',
  user: 'webadmin_chinabank',
  password: 'chinaAdmin!',
  database: 'webadmin_crud'
})
db.connect()

app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:8080', 'https://mern-repo.github.io', 'https://mern-repo-github-io.onrender.com'],
  // origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser())

app.get('/', (_req, res) => {
  res.send('Response')
})

app.get('/getusers/', (req, res) => {
  const q = 'select * from users'
  db.query(q, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

app.post('/register/', (req, res) => {
  const q = 'insert into login (`username`,`password`) values  (?)'
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json(err)
    const values = [
      req.body.username,
      hash
    ]
    db.query(q, [values], (err, result) => {
      if (err) return res.json(err)
      if (result) {
        return res.json({ Status: 'Success' })
      } else {
        return res.json({ Message: 'Invalid' })
      }
    })
  })
})

app.post('/login/', (req, res) => {
  const q = 'select * from login where `username` = ?'
  const values = [
    req.body.username
  ]
  db.query(q, [...values], (err, result) => {
    if (err) return res.json(err)
    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if (err) return res.json(err)
        if (response) {
          const name = result[0].name
          const token = jwt.sign({ name }, 'jwt-secret-token', { expiresIn: '1d' })
          res.cookie('token', token)
          return res.json({ Status: 'Success' })
        } else {
          return res.json({ Message: 'Invalid' })
        }
      })
    } else {
      return res.json({ Message: 'Invalid' })
    }
  })
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ Message: 'Invalid Token' })
  } else {
    jwt.verify(token, 'jwt-secret-token', (err, _result) => {
      if (err) {
        return res.json({ Message: 'Invalid Secret Token' })
      } else {
        next()
      }
    })
  }
}
app.get('/authorize/', verifyUser, (_req, res) => {
  return res.json({ Status: 'Success' })
})

app.get('/logout/', (_req, res) => {
  res.clearCookie('token')
  return res.json({ Status: 'Success' })
})

app.listen(PORT, () => { console.log('Server Running on PORT:', PORT) })