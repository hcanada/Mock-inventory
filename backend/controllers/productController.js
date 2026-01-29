import Product from '../models/Product.js';
import ApiError from '../utils/ApiError.js';
import logActivity from '../services/activityLogService.js';

// @desc    Get all products with search, filter, sort, pagination
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = { isActive: true };

    // Search by name or SKU
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email'),
      Product.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate('createdBy', 'name email');

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, sku, category, quantity, price, description } = req.body;

    const product = await Product.create({
      name,
      sku,
      category,
      quantity,
      price,
      description,
      createdBy: req.user._id,
    });

    await logActivity('PRODUCT_CREATED', product._id, req.user._id, {
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    const oldQuantity = product.quantity;
    const { name, sku, category, quantity, price, description } = req.body;

    // Track changes for logging
    const changes = {};
    if (name && name !== product.name) changes.name = { from: product.name, to: name };
    if (sku && sku !== product.sku) changes.sku = { from: product.sku, to: sku };
    if (category && category !== product.category) changes.category = { from: product.category, to: category };
    if (quantity !== undefined && quantity !== product.quantity) changes.quantity = { from: product.quantity, to: quantity };
    if (price !== undefined && price !== product.price) changes.price = { from: product.price, to: price };
    if (description !== undefined && description !== product.description) changes.description = { from: product.description, to: description };

    // Update fields
    if (name) product.name = name;
    if (sku) product.sku = sku;
    if (category) product.category = category;
    if (quantity !== undefined) product.quantity = quantity;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;

    await product.save();

    // Log activity
    if (quantity !== undefined && quantity !== oldQuantity) {
      await logActivity('QUANTITY_CHANGED', product._id, req.user._id, {
        from: oldQuantity,
        to: quantity,
      });
    } else if (Object.keys(changes).length > 0) {
      await logActivity('PRODUCT_UPDATED', product._id, req.user._id, changes);
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    product.isActive = false;
    await product.save();

    await logActivity('PRODUCT_DELETED', product._id, req.user._id, {
      name: product.name,
      sku: product.sku,
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
