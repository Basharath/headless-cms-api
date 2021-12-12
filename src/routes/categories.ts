import { Router } from 'express';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getCategories);

router.post('/', auth, addCategory);

router.put('/:id', auth, updateCategory);

router.delete('/:id', auth, deleteCategory);

export default router;
