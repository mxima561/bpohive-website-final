const express = require('express');
const router = express.Router();
const db = require('../database');
const { verifyToken } = require('./auth');
const multer = require('multer');
const path = require('path');

// Multer setup for blog images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Helper to slugify title
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

// GET all posts
router.get('/', (req, res) => {
    db.all("SELECT * FROM posts ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET single post by slug
router.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    db.get("SELECT * FROM posts WHERE slug = ?", [slug], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Post not found' });
        res.json(row);
    });
});

// POST create post (Protected)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const slug = slugify(title) + '-' + Date.now(); // Ensure uniqueness
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(
        `INSERT INTO posts (title, slug, content, image_url) VALUES (?, ?, ?, ?)`,
        [title, slug, content, imageUrl],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, slug, imageUrl, message: 'Post created' });
        }
    );
});

// PUT update post (Protected)
router.put('/:id', verifyToken, upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;

    // First get existing post to check for image
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Post not found' });

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : row.image_url;
        const newSlug = title ? slugify(title) : row.slug;

        db.run(
            `UPDATE posts SET title = COALESCE(?, title), slug = COALESCE(?, slug), content = COALESCE(?, content), image_url = ? WHERE id = ?`,
            [title, newSlug, content, imageUrl, id],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Post updated' });
            }
        );
    });
});

// DELETE post (Protected)
router.delete('/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Post deleted' });
    });
});

module.exports = router;
