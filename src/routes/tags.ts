import { Router } from 'express';
import { getTags, addTag, updateTag, deleteTag } from '../controllers/tags';

const router = Router();

router.get('/', getTags);

router.post('/', addTag);

router.put('/:id', updateTag);

router.delete('/:id', deleteTag);

export default router;
