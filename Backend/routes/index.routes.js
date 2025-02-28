import express from 'express'
const router = express.Router()

// imports for routes
import authRoutes from './auth.routes.js'
import projectRoutes from './project.routes.js'
import { authMiddleware, isAdmin, isUser } from '../middlewares/auth.middleware.js'
import membersRoutes from './members.routes.js'
import projectMemberRoutes from './project_member.routes.js'

router.use('/auth',authRoutes)
router.use('/project',[authMiddleware,isAdmin],projectRoutes)
router.use('/members',[authMiddleware,isAdmin],membersRoutes)
router.use('/project-member',[authMiddleware,isUser],projectMemberRoutes)
export default router