#!/bin/bash

BASE_URL="http://localhost:3001/api"
USERNAME="admin"
PASSWORD="password123"

# 1. Login
echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Login failed. Response: $LOGIN_RESPONSE"
  exit 1
fi
echo "Login successful. Token: ${TOKEN:0:10}..."

# 2. Create Post
echo "Creating Post..."
TITLE="Test Post $(date +%s)"
CONTENT="<p>Test Content</p>"
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/posts" \
  -H "Authorization: Bearer $TOKEN" \
  --form-string "title=$TITLE" \
  --form-string "content=$CONTENT")

POST_ID=$(echo $CREATE_RESPONSE | grep -o '"id":[^,]*' | cut -d':' -f2 | tr -d '}')
SLUG=$(echo $CREATE_RESPONSE | grep -o '"slug":"[^"]*' | cut -d'"' -f4)

if [ -z "$POST_ID" ]; then
  echo "Create failed. Response: $CREATE_RESPONSE"
  exit 1
fi
echo "Post Created. ID: $POST_ID, Slug: $SLUG"

# 3. Get Post
echo "Fetching Post ($SLUG)..."
GET_RESPONSE=$(curl -s -X GET "$BASE_URL/posts/$SLUG")
FETCHED_ID=$(echo $GET_RESPONSE | grep -o '"id":[^,]*' | cut -d':' -f2 | tr -d '}')

if [ "$FETCHED_ID" != "$POST_ID" ]; then
    echo "Fetch failed. Expected ID $POST_ID, got $FETCHED_ID"
    exit 1
fi
echo "Post fetched successfully."

# 4. Update Post
echo "Updating Post..."
UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN" \
  --form-string "title=Updated Title" \
  --form-string "content=<p>Updated Content</p>")

echo "Update Response: $UPDATE_RESPONSE"

# 5. Delete Post
echo "Deleting Post..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN")

echo "Delete Response: $DELETE_RESPONSE"

# 6. Verify Deletion
echo "Verifying Deletion..."
VERIFY_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$BASE_URL/posts/$SLUG")

if [ "$VERIFY_RESPONSE" == "404" ]; then
  echo "SUCCESS: Post deleted (404 received)."
else
  echo "FAILURE: Post still exists (Status: $VERIFY_RESPONSE)."
  exit 1
fi
