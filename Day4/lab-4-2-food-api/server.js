const express = require('express');
const cors = require('cors');
const path = require('path');
const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs',
            stats: '/api/stats'
        }
    });
});

// Food routes
app.use('/api/foods', foodRoutes);

// API Documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Food API',
        version: '1.0.0',
        description: 'API สำหรับเมนูอาหาร พร้อม filter, search, random, category',
        endpoints: [
            { method: 'GET', path: '/api/foods', description: 'รายการอาหารทั้งหมด + filter params' },
            { method: 'GET', path: '/api/foods/:id', description: 'ข้อมูลอาหารตาม ID' },
            { method: 'GET', path: '/api/foods/category/:category', description: 'อาหารตามประเภท' },
            { method: 'GET', path: '/api/foods/random', description: 'อาหารสุ่ม 1 จาน' },
            { method: 'GET', path: '/api/stats', description: 'สถิติเมนูอาหาร' }
        ]
    });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
    const fs = require('fs');
    const foodsFile = path.join(__dirname, 'data/foods.json');
    let foods = [];
    try {
        foods = JSON.parse(fs.readFileSync(foodsFile, 'utf8'));
    } catch (err) {}
    const total = foods.length;
    const categoryCount = foods.reduce((acc, f) => {
        acc[f.category] = (acc[f.category] || 0) + 1;
        return acc;
    }, {});
    res.json({ success: true, total, categoryCount });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
});
