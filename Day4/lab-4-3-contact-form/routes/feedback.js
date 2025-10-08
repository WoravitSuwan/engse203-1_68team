const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { readJsonFile, appendToJsonFile } = require('../middleware/fileManager');

const FEEDBACK_FILE = 'feedback.json';

// POST /api/feedback
router.post('/', validateFeedback, async (req, res) => {
    const saved = await appendToJsonFile(FEEDBACK_FILE, req.body);
    if (saved) res.json({ success: true, message: 'Feedback saved successfully', data: saved });
    else res.status(500).json({ success: false, message: 'Failed to save feedback' });
});

// GET /api/feedback/stats
router.get('/stats', async (req, res) => {
    const feedbacks = await readJsonFile(FEEDBACK_FILE);
    const total = feedbacks.length;
    const avgRating = total > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(2) : 0;
    res.json({ success: true, total, avgRating });
});

module.exports = router;
