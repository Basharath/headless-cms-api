import { Router } from 'express';
import posts from '../controllers/posts';
import auth from '../middleware/auth';

const router = Router();
const {
  getPosts,
  postsByTags,
  postsByCategory,
  addPost,
  updatePost,
  deletePost,
  deleteImage,
} = posts;

// /api/posts?page=1&limit=8
router.get('/', getPosts);
router.get('/tag/:tag', postsByTags);
router.get('/category/:category', postsByCategory);
router.get('/:id', getPosts);
router.post('/', auth, addPost);
router.put('/:id', auth, updatePost);
router.delete('/image', auth, deleteImage);
router.delete('/:id', auth, deletePost);

export default router;
