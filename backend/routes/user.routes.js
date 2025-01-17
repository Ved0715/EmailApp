import express from 'express';
import { register, login, logout, googleLogin , setPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/google-login', googleLogin);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/set-password', setPassword);


export default router;
