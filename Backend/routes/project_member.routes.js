import express from 'express'
import { getProjects } from '../controller/project_member.controller.js';
const router = express.Router()

router.get('/get_projects',getProjects)

export default router;
