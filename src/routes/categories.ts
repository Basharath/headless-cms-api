import { Router } from 'express';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories';

const router = Router();

router.get('/', getCategories);

router.post('/', addCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

export default router;
