require('dotenv').config();
const mongoose = require('mongoose');
const Sale = require('./models/Sale');
const UserActivity = require('./models/UserActivity');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bigdata-mern';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Starting data generation...');

    // Clear existing data
    await Sale.deleteMany({});
    await UserActivity.deleteMany({});
    console.log('Cleared existing data.');

    // Generate Sales Data (5000 records)
    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
    const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];
    const sales = [];
    
    // Generate data over the past 2 years
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);

    for (let i = 0; i < 5000; i++) {
      const date = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()));
      sales.push({
        date,
        amount: Math.round(Math.random() * 1000) + 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        region: regions[Math.floor(Math.random() * regions.length)]
      });
    }
    
    // Insert in batches
    await Sale.insertMany(sales);
    console.log('Inserted 5000 sales records.');

    // Generate User Activity Data (10000 records)
    const actions = ['login', 'view_product', 'add_to_cart', 'purchase', 'logout'];
    const devices = ['mobile', 'desktop', 'tablet'];
    const activities = [];

    for (let i = 0; i < 10000; i++) {
      const timestamp = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()));
      activities.push({
        timestamp,
        action: actions[Math.floor(Math.random() * actions.length)],
        userId: `user_${Math.floor(Math.random() * 1000)}`, // 1000 distinct users
        device: devices[Math.floor(Math.random() * devices.length)]
      });
    }

    await UserActivity.insertMany(activities);
    console.log('Inserted 10000 user activity records.');

    console.log('Data seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDatabase();
