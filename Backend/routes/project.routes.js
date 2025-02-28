import express from 'express'
const router = express.Router()

import { assignProject, createProject,getProject,updateProject } from '../controller/project.controller.js'

router.post('/create',createProject)
router.get('/',getProject)
router.patch('/:project_id',updateProject)
router.post('/assign',assignProject)


export default router;
