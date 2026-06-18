const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const UserActivity = require('../models/UserActivity');

// 1. Get Sales Over Time (Monthly)
router.get('/sales/monthly', async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalAmount: { $sum: "$amount" },
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const formattedSales = sales.map(s => ({
      name: `${s._id.month}/${s._id.year}`,
      totalAmount: Math.round(s.totalAmount)
    }));

    res.json(formattedSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get Sales by Category
router.get('/sales/category', async (req, res) => {
  try {
    const categorySales = await Sale.aggregate([
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" }
        }
      },
      { $sort: { value: -1 } }
    ]);
    const formatted = categorySales.map(c => ({ name: c._id, value: Math.round(c.value) }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get User Activity by Device
router.get('/users/device', async (req, res) => {
  try {
    const activity = await UserActivity.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 }
        }
      }
    ]);
    const formatted = activity.map(a => ({ name: a._id, value: a.count }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Get Summary KPIs
router.get('/summary', async (req, res) => {
  try {
    const totalSalesAgg = await Sale.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const totalSales = totalSalesAgg[0] ? totalSalesAgg[0].total : 0;
    
    const totalUsers = await UserActivity.distinct('userId').length || 0; // Rough estimate using length is ok for mock
    // better way:
    const distinctUsersAgg = await UserActivity.aggregate([{ $group: { _id: "$userId" } }, { $count: "total" }]);
    const distinctUsers = distinctUsersAgg[0] ? distinctUsersAgg[0].total : 0;
    
    const totalEvents = await UserActivity.countDocuments();

    res.json({
      totalSales: Math.round(totalSales),
      totalUsers: distinctUsers,
      totalEvents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
