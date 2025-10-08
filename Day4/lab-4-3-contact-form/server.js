const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');
const { getFileStats } = require('./middleware/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/status
app.get('/api/status', async (req, res) => {
    const stats = await getFileStats();
    res.json({ success: true, status: 'ok', stats });
});

// API Docs
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': 'Submit contact form',
            'GET /api/contact': 'Get contact submissions (pagination)',
            'POST /api/feedback': 'Submit feedback',
            'GET /api/feedback/stats': 'Get feedback statistics',
            'GET /api/status': 'API status and counts'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found', requestedUrl: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
