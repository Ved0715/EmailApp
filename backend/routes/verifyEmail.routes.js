import express from 'express';
import { verifyEmail , sendVerificationCode} from '../controllers/verifyEmail.controller.js';

const router = express.Router();

router.post('/verify-verification-code', verifyEmail);
router.post('/send-verification-code', sendVerificationCode);


export default router;