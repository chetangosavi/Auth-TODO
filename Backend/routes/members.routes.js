import express from 'express';
import { addMember } from '../controller/member.controller.js';

const router = express.Router();

router.post('/add',addMember)


export default router; 