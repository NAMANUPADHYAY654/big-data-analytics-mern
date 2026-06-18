// dataEngine.js
// Generates complex, realistic "big data" locally in the browser.

export function generateRawData(numRecords = 5000) {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];
  const devices = ['mobile', 'desktop', 'tablet'];
  
  const rawData = [];
  const now = new Date();
  
  // Go back up to 2 years (approx 730 days)
  for (let i = 0; i < numRecords; i++) {
    const daysAgo = Math.floor(Math.random() * 730);
    const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    
    rawData.push({
      id: `TRX-${Math.floor(Math.random() * 1000000)}`,
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      timestamp: date.getTime(),
      amount: Math.round(Math.random() * 1000) + 10,
      category: categories[Math.floor(Math.random() * categories.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      userId: `USR-${Math.floor(Math.random() * 500)}` // 500 distinct users
    });
  }
  
  // Sort by newest first
  return rawData.sort((a, b) => b.timestamp - a.timestamp);
}

export function processData(rawData, daysFilter = 30) {
  const now = new Date().getTime();
  const cutoff = now - (daysFilter * 24 * 60 * 60 * 1000);
  
  // Filter by date range
  let filteredData = rawData;
  if (daysFilter !== 'all') {
    filteredData = rawData.filter(d => d.timestamp >= cutoff);
  }

  // Aggregations
  let totalSales = 0;
  const uniqueUsers = new Set();
  
  const categoryMap = {};
  const deviceMap = {};
  const monthlyMap = {};

  filteredData.forEach(row => {
    totalSales += row.amount;
    uniqueUsers.add(row.userId);

    // Category Aggregation
    categoryMap[row.category] = (categoryMap[row.category] || 0) + row.amount;

    // Device Aggregation
    deviceMap[row.device] = (deviceMap[row.device] || 0) + 1;

    // Monthly Aggregation (YYYY-MM)
    const monthYear = row.date.substring(0, 7);
    monthlyMap[monthYear] = (monthlyMap[monthYear] || 0) + row.amount;
  });

  // Format for Recharts
  const categorySales = Object.keys(categoryMap).map(k => ({ name: k, value: categoryMap[k] })).sort((a,b)=>b.value-a.value);
  const deviceActivity = Object.keys(deviceMap).map(k => ({ name: k, value: deviceMap[k] }));
  
  const monthlySales = Object.keys(monthlyMap).sort().map(k => ({
    name: k,
    totalAmount: monthlyMap[k]
  }));

  return {
    summary: {
      totalSales,
      totalUsers: uniqueUsers.size,
      totalEvents: filteredData.length
    },
    monthlySales,
    categorySales,
    deviceActivity,
    filteredData // raw data for the grid
  };
}
