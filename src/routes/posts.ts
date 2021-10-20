import { Router } from 'express';
import posts from '../controllers/posts';

const router = Router();
const { getPosts, addPost, updatePost, deletePost } = posts;

router.get('/', getPosts);
router.get('/:id', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
