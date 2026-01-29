import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from '../validators/productValidator.js';
import validate from '../middleware/validateMiddleware.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getProducts)
  .post(protect, authorize('admin'), validate(createProductValidator), createProduct);

router
  .route('/:id')
  .get(protect, validate(productIdValidator), getProduct)
  .put(protect, validate(updateProductValidator), updateProduct)
  .delete(protect, authorize('admin'), validate(productIdValidator), deleteProduct);

export default router;
