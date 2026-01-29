import Product from '../models/Product.js';

// @desc    Get dashboard summary metrics
// @route   GET /api/dashboard/summary
// @access  Private
export const getSummary = async (req, res, next) => {
  try {
    const [summary] = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$quantity', '$price'] } },
          totalQuantity: { $sum: '$quantity' },
          avgPrice: { $avg: '$price' },
          inStock: {
            $sum: { $cond: [{ $eq: ['$status', 'In Stock'] }, 1, 0] },
          },
          lowStock: {
            $sum: { $cond: [{ $eq: ['$status', 'Low Stock'] }, 1, 0] },
          },
          outOfStock: {
            $sum: { $cond: [{ $eq: ['$status', 'Out of Stock'] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalProducts: 1,
          totalValue: { $round: ['$totalValue', 2] },
          totalQuantity: 1,
          avgPrice: { $round: ['$avgPrice', 2] },
          inStock: 1,
          lowStock: 1,
          outOfStock: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: summary || {
        totalProducts: 0,
        totalValue: 0,
        totalQuantity: 0,
        avgPrice: 0,
        inStock: 0,
        lowStock: 0,
        outOfStock: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chart data for dashboard
// @route   GET /api/dashboard/charts
// @access  Private
export const getCharts = async (req, res, next) => {
  try {
    // Products by category
    const byCategory = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
          totalValue: { $round: ['$totalValue', 2] },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Products by status
    const byStatus = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1,
        },
      },
    ]);

    // Products added over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const overTime = await Product.aggregate([
      {
        $match: {
          isActive: true,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        byCategory,
        byStatus,
        overTime,
      },
    });
  } catch (error) {
    next(error);
  }
};
