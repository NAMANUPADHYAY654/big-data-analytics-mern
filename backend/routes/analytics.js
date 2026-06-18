const express = require('express');
const router = express.Router();

// Generate dynamic mock data in memory
const generateMockData = () => {
  const summary = {
    totalSales: 845230,
    totalUsers: 1420,
    totalEvents: 15420
  };

  const monthlySales = [
    { name: '1/2025', totalAmount: 42000 },
    { name: '2/2025', totalAmount: 51000 },
    { name: '3/2025', totalAmount: 48000 },
    { name: '4/2025', totalAmount: 62000 },
    { name: '5/2025', totalAmount: 71000 },
    { name: '6/2025', totalAmount: 85000 },
  ];

  const categorySales = [
    { name: 'Electronics', value: 340000 },
    { name: 'Clothing', value: 210000 },
    { name: 'Home & Garden', value: 150000 },
    { name: 'Sports', value: 95000 },
    { name: 'Books', value: 50230 },
  ];

  const deviceActivity = [
    { name: 'mobile', value: 8500 },
    { name: 'desktop', value: 5200 },
    { name: 'tablet', value: 1720 },
  ];

  return { summary, monthlySales, categorySales, deviceActivity };
};

const data = generateMockData();

router.get('/sales/monthly', (req, res) => res.json(data.monthlySales));
router.get('/sales/category', (req, res) => res.json(data.categorySales));
router.get('/users/device', (req, res) => res.json(data.deviceActivity));
router.get('/summary', (req, res) => res.json(data.summary));

module.exports = router;
