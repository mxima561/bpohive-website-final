const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const API_URL = 'http://localhost:3001/api';
let token;
let postId;
let postSlug;

async function runVerification() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            username: 'admin',
            password: 'password123'
        });
        token = loginRes.data.token;
        console.log('   Login successful. Token obtained.');

        console.log('2. Creating a Blog Post...');
        const form = new FormData();
        form.append('title', 'Test Blog Post ' + Date.now());
        form.append('content', '<p>This is a test post content.</p>');
        // We won't upload an image for this basic test unless necessary, 
        // but let's try without image first as it's optional in my code.

        const createRes = await axios.post(`${API_URL}/posts`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        });
        postId = createRes.data.id;
        postSlug = createRes.data.slug;
        console.log(`   Post created. ID: ${postId}, Slug: ${postSlug}`);

        console.log('3. Fetching All Posts...');
        const listRes = await axios.get(`${API_URL}/posts`);
        const found = listRes.data.find(p => p.id === postId);
        if (found) {
            console.log('   Post found in list.');
        } else {
            throw new Error('Post not found in list!');
        }

        console.log(`4. Fetching Single Post by Slug: ${postSlug}...`);
        const singleRes = await axios.get(`${API_URL}/posts/${postSlug}`);
        if (singleRes.data.id === postId) {
            console.log('   Single post fetched successfully.');
        } else {
            throw new Error('Fetched post ID does not match!');
        }

        console.log('5. Updating Post...');
        const updateForm = new FormData();
        updateForm.append('title', 'Updated Title ' + Date.now());
        updateForm.append('content', '<p>Updated content.</p>');

        await axios.put(`${API_URL}/posts/${postId}`, updateForm, {
            headers: {
                ...updateForm.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('   Post updated.');

        console.log('6. Deleting Post...');
        await axios.delete(`${API_URL}/posts/${postId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('   Post deleted.');

        // Verify deletion
        try {
            await axios.get(`${API_URL}/posts/${postSlug}`);
            throw new Error('Post should have been deleted but was found!');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log('   Deletion confirmed (404 received).');
            } else {
                throw err;
            }
        }

        console.log('\n✅ VERIFICATION SUCCESSFUL: Blog System API is working correctly.');

    } catch (err) {
        console.error('\n❌ VERIFICATION FAILED:', err.message);
        if (err.response) {
            console.error('   Status:', err.response.status);
            console.error('   Data:', err.response.data);
        }
    }
}

runVerification();
