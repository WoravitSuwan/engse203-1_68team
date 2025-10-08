const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error loading foods:', err);
        return [];
    }
};

// GET /api/foods - list + filtering
router.get('/', (req, res) => {
    let foods = loadFoods();
    const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;

    if (search) {
        const q = search.toLowerCase();
        foods = foods.filter(f =>
            f.name.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q)
        );
    }
    if (category) foods = foods.filter(f => f.category === category);
    if (maxSpicy) foods = foods.filter(f => f.spicy <= Number(maxSpicy));
    if (vegetarian !== undefined) foods = foods.filter(f => f.vegetarian === (vegetarian === 'true'));
    if (available !== undefined) foods = foods.filter(f => f.available === (available === 'true'));
    if (maxPrice) foods = foods.filter(f => f.price <= Number(maxPrice));

    res.json({
        success: true,
        data: foods,
        total: foods.length,
        filters: { search, category, maxSpicy, vegetarian, available, maxPrice }
    });
});

// GET /api/foods/:id
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const food = foods.find(f => f.id === Number(req.params.id));
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
    res.json({ success: true, data: food });
});

// GET /api/foods/category/:category
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const filtered = foods.filter(f => f.category === req.params.category);
    res.json({ success: true, total: filtered.length, data: filtered });
});

// GET /api/foods/random
router.get('/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) return res.status(404).json({ success: false, message: 'No foods available' });
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    res.json({ success: true, data: randomFood });
});

module.exports = router;
