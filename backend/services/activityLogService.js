import ActivityLog from '../models/ActivityLog.js';

const logActivity = async (action, productId, userId, details = {}) => {
  try {
    await ActivityLog.create({
      action,
      productId,
      userId,
      details,
    });
  } catch (error) {
    console.error('Failed to log activity:', error.message);
  }
};

export default logActivity;
