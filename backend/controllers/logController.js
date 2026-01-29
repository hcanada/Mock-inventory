import ActivityLog from '../models/ActivityLog.js';

// @desc    Get activity logs with pagination
// @route   GET /api/logs
// @access  Private/Admin
export const getLogs = async (req, res, next) => {
  try {
    const {
      action,
      productId,
      userId,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (action) {
      query.action = action;
    }

    if (productId) {
      query.productId = productId;
    }

    if (userId) {
      query.userId = userId;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      ActivityLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('productId', 'name sku')
        .populate('userId', 'name email'),
      ActivityLog.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: logs,
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
