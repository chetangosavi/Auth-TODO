
import express from 'express'
import { login, signup } from '../controller/auth.controller.js'
import { createProject } from '../controller/project.controller.js'
import { createTask } from '../controller/task.controller.js'
import { Member } from '../controller/member.controller.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/project',createProject)
router.post('/task',createTask)
router.post('/member',Member)


export default router