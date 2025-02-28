
import express from 'express'
import { login, me, signup } from '../controller/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/me',authMiddleware,me)


export default router