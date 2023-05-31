const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')
const { UNAUTHORIZED, StatusCodeError } = require('../utils/errors')
const { reIsUrl } = require('../middlewares/validations')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => reIsUrl.test(url),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
},
  { versionKey: false }
)
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new StatusCodeError(UNAUTHORIZED, 'Invalid email or password')
        )
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new StatusCodeError(UNAUTHORIZED, 'Invalid email or password')
          )
        }
        return user
      })
    })
}
module.exports = mongoose.model('user', userSchema)
