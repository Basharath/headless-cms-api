import { Router } from 'express';
import backupCollection from '../controllers/backup';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, backupCollection);

export default router;
