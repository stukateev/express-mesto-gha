const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/mestodb ' } =   process.env
const app = express()
const userRouter = require('./routes/users')
const cardRouter = require('./routes/cards')
const {NOT_FOUND} =
app.use(bodyParser.json())
app.use((req, res, next) => {
  req.user = {
    _id: '645a7aae39fef7c2828a08e3',
  }
  next()
})
app.use(userRouter);
app.use(cardRouter);


mongoose.connect(DB_PATH)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})