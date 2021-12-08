import { Router } from 'express';
import posts from '../controllers/posts';

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

router.get('/', getPosts);
router.get('/tag/:tag', postsByTags);
router.get('/category/:category', postsByCategory);
router.get('/:id', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/image', deleteImage);
router.delete('/:id', deletePost);

export default router;
