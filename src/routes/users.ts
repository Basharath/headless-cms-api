import { Router } from 'express';
import { signIn, signUp, changePassword } from '../controllers/users';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/changepassword', changePassword);

export default router;
