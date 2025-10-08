const express = require('express');
const router = express.Router();
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');
const { validateContact } = require('../middleware/validation');

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
    const savedData = await appendToJsonFile('contacts.json', req.body);
    if (savedData) {
        res.json({
            success: true,
            message: 'Contact saved successfully',
            data: savedData
        });
    } else {
        res.status(500).json({ success: false, message: 'Failed to save contact' });
    }
});

// GET /api/contact
router.get('/', async (req, res) => {
    const contacts = await readJsonFile('contacts.json');
    res.json({
        success: true,
        page: 1,
        limit: 10,
        total: contacts.length,
        data: contacts
    });
});

module.exports = router;
