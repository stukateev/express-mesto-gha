const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')


const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/mestodb ' } =   process.env
const app = express()

const userRouter = require('./routes/users')
const cardRouter = require('./routes/cards')
const auth = require('./middlewares/auth')
const errorsHandler = require('./middlewares/handleError')
const { createUser, login } = require('./controllers/users')
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations')


app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', validationLogin, login)
app.post('/signup', validationCreateUser, createUser)

app.use(auth)
app.use(errors())
app.use(errorsHandler)
app.use(userRouter);
app.use(cardRouter);


mongoose.connect(DB_PATH)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})