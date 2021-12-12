import { Router } from 'express';
import { getTags, addTag, updateTag, deleteTag } from '../controllers/tags';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getTags);

router.post('/', auth, addTag);

router.put('/:id', auth, updateTag);

router.delete('/:id', auth, deleteTag);

export default router;
