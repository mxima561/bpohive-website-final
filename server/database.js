const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, 'bpohive.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            // Create Users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password_hash TEXT
            )`, (err) => {
                if (err) {
                    console.error('Error creating users table:', err.message);
                } else {
                    // Create default admin user if not exists
                    const username = 'admin';
                    const password = 'password123';
                    const saltRounds = 10;

                    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                        if (err) {
                            console.error(err.message);
                        }
                        if (!row) {
                            bcrypt.hash(password, saltRounds, (err, hash) => {
                                if (err) {
                                    console.error('Error hashing password:', err);
                                } else {
                                    db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash], (err) => {
                                        if (err) {
                                            console.error('Error creating admin user:', err.message);
                                        } else {
                                            console.log('Default admin user created.');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

            // Create Content table
            db.run(`CREATE TABLE IF NOT EXISTS content (
                key TEXT PRIMARY KEY,
                value TEXT,
                type TEXT
            )`, (err) => {
                if (err) {
                    console.error('Error creating content table:', err.message);
                }
            });

            // Create Posts table (Blog)
            db.run(`CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                content TEXT NOT NULL,
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) {
                    console.error('Error creating posts table:', err.message);
                } else {
                    console.log('Posts table ready.');
                }
            });
        });
    }
});

module.exports = db;
