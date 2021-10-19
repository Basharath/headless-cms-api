import { Router } from 'express';
import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from '../controllers/posts';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
