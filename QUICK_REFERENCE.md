# Quick Reference: Send & Receive Data

## 🚀 Quick Start

### 1. Server Running

```bash
cd server
npm install
npm run dev
```

### 2. Open Client

Open `client.html` in your browser

### 3. Start Creating Data!

---

## 📡 How Data Flows

```
CLIENT (Browser)
    ↓ fetch() POST/GET/PUT/DELETE
SERVER (Express on port 5000)
    ↓ validate & process
DATABASE (MongoDB)
    ↓ response JSON
CLIENT (Browser)
    ↓ display data
```

---

## 🎯 Curl Examples (for testing)

### Create User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "age": 28
  }'
```

### Get All Users

```bash
curl http://localhost:5000/api/users
```

### Get Single User

```bash
curl http://localhost:5000/api/users/USER_ID
```

### Update User

```bash
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "age": 30
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:5000/api/users/USER_ID
```

### Create Post

```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "body": "This is the content of my post",
    "author": "USER_ID",
    "tags": ["nodejs", "mongodb"]
  }'
```

### Get Posts (Paginated)

```bash
curl "http://localhost:5000/api/posts?limit=5&page=1"
```

### Add Comment to Post

```bash
curl -X POST http://localhost:5000/api/posts/POST_ID/comments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Reader Name",
    "email": "reader@example.com",
    "content": "Great post!"
  }'
```

---

## 📊 Database Collections

### Users

Stores user information with validation

- Unique emails
- Required fields: name, email
- Optional fields: phone, age, address

### Posts

Stores blog posts with comments

- References user as author
- Contains nested comments
- Supports tags and pagination

---

## ✨ Features Already Implemented

✅ Data validation (server-side)
✅ Error handling
✅ CORS enabled for cross-origin requests
✅ MongoDB connection with mongoose
✅ Timestamps on all records
✅ Pagination for posts
✅ User-friendly web interface
✅ Real-time data display
✅ Delete confirmation dialogs

---

## 🔗 Important Links

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Express.js Docs**: https://expressjs.com
- **Mongoose Docs**: https://mongoosejs.com
- **Fetch API Docs**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 💬 Common Issues

**Problem**: Connection refused
**Solution**: Make sure your server is running with `npm run dev`

**Problem**: CORS errors
**Solution**: CORS is already enabled in your app.js

**Problem**: Can't create user with duplicate email
**Solution**: Use a different email address, or delete the existing user first

**Problem**: Can't find user for post
**Solution**: Make sure the user exists first (check user list), then copy their ID

---

## 📝 File Structure

```
server/
├── app.js                    (Main server file)
├── package.json              (Dependencies)
├── .env                      (Database connection)
├── Models/
│   ├── userModel.js          (User schema)
│   └── postModel.js          (Post schema)
└── Routes/
    ├── UserRoutes.js         (User endpoints)
    └── PostRoutes.js         (Post endpoints)

client.html                    (Web interface)
MONGODB_GUIDE.md              (Full documentation)
```

---

## 🎓 What You've Learned

- How to design MongoDB schemas
- How to validate data before saving
- How to handle relationships between collections
- How to create REST APIs
- How to communicate between client and server
- How to use async/await with MongoDB
- How to implement pagination
- How to embed subdocuments (comments)

Congratulations! 🎉
