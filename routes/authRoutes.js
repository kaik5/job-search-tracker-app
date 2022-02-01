import express from 'express'
const router = express.Router()
import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 10,
    message: 'You have requested too frequently, please try again later (3 mins)',
  })

import {register, login, updateUser} from '../controllers/authController.js'
import authenticateUser from "../middleware/auth.js"

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/update').patch(authenticateUser, updateUser)

export default router;

