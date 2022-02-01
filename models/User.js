import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name.'],
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email.',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password.'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: 'Unknown last name',
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: 'Unknown location',
  },
})

UserSchema.pre('save', async function () {
  console.log(this.modifiedPaths())
  console.log(this.isModified('name'))
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    // token expiration time
    { expiresIn: process.env.JWT_LIFETIME },
  )
}

UserSchema.methods.comparePassword = async function (password2) {
  const isMatched = await bcrypt.compare(password2, this.password)
  return isMatched
}

export default mongoose.model('User', UserSchema)
