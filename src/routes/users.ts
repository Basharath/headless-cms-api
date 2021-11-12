import { Router } from 'express';
import {
  signIn,
  signUp,
  changePassword,
  userData,
  signOut,
} from '../controllers/users';
import auth from '../middleware/auth';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/token', auth, userData);
router.get('/signout', signOut);
router.post('/changepassword', auth, changePassword);

export default router;
