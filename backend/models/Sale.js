const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  region: { type: String, required: true },
});

module.exports = mongoose.model('Sale', saleSchema);
