const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 3000;
const verifyToken = require('./middleware/AuthMiddleware');

const todoRoutes = require('./routes/todo')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

const db = require('./models');
db.sequelize.sync()

app.use('/api/auth', authRoutes)

app.use('/api/todos', verifyToken, todoRoutes)
app.use('/api/users', verifyToken, userRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})