const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Serve Admin Dashboard
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Serve Frontend (Root)
app.use(express.static(path.join(__dirname, '../')));

// Import routes
const authRoutes = require('./routes/auth').router;
const contentRoutes = require('./routes/content');
const postsRoutes = require('./routes/posts');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/posts', postsRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'BPO Hive CMS API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
