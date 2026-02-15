const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('./auth');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// PUBLIC: Get all content
router.get('/', (req, res) => {
    db.all("SELECT * FROM content", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Convert array to object for easier frontend consumption
        const contentMap = {};
        rows.forEach(row => {
            contentMap[row.key] = row;
        });
        res.json(contentMap);
    });
});

// PROTECTED: Update content (text or image URL)
router.post('/', verifyToken, (req, res) => {
    const { key, value, type } = req.body;

    if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' });
    }

    const contentType = type || 'text';

    db.run(
        `INSERT INTO content (key, value, type) VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET value=excluded.value, type=excluded.type`,
        [key, value, contentType],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Content updated successfully', key, value });
        }
    );
});

// PROTECTED: Upload image
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the URL to access the file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

module.exports = router;
