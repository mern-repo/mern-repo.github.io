import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const app = express()
const salt = 10
const MYSQL_CREDENTIALS = process.env.MYSQL_CREDITS
const PORT = process.env.PORT
const ORIGIN = process.env.ORIGIN
const METHODS = process.env.METHODS

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

app.use(cors({
  origin: ORIGIN,
  methods: METHODS,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

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
  const values = [
    req.body.username,
    req.body.password,
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

app.post('/login/', (req, res) => {
  const q = 'select * from login where `username`=? AND `password`=?'
  const values = [
    req.body.username,
    req.body.password,
  ]
  db.query(q, [...values], (err, result) => {
    if (err) return res.json(err)
    if (result.length > 0) {
      return res.json({ Status: 'Success' })
    } else {
      return res.json({ Message: 'Invalid' })
    }
  })
})

app.listen(PORT, () => { console.log('Server Running on PORT:', PORT) })