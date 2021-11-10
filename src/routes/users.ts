import { Router } from 'express';
import { signIn, signUp, changePassword, userData } from '../controllers/users';
import auth from '../middleware/auth';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/token', auth, userData);
router.post('/changepassword', auth, changePassword);

export default router;
