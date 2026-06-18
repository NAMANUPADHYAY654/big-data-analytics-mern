const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  action: { type: String, required: true }, // e.g., 'login', 'view_product', 'purchase'
  userId: { type: String, required: true },
  device: { type: String, required: true }, // e.g., 'mobile', 'desktop'
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
