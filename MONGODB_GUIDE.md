# MongoDB Database Design Guide

## 📊 Your Database Architecture

Your project uses MongoDB with two main collections:

### 1. **Users Collection**

#### Schema Structure:

```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  phone: String (optional, validated),
  age: Number (0-150, optional),
  address: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### Example Document:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "age": 28,
  "address": "123 Main St, New York, NY",
  "isActive": true,
  "createdAt": "2025-11-17T10:30:00Z",
  "updatedAt": "2025-11-17T10:30:00Z"
}
```

### 2. **Posts Collection**

#### Schema Structure:

```javascript
{
  _id: ObjectId,
  title: String (required),
  body: String (required),
  author: ObjectId (ref: User, optional),
  tags: [String],
  comments: [
    {
      name: String (required),
      email: String (optional),
      content: String (required),
      createdAt: Date (default: now)
    }
  ],
  publishedAt: Date (default: now),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### Example Document:

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Getting Started with MongoDB",
  "body": "MongoDB is a NoSQL database that stores data in flexible JSON-like documents...",
  "author": "507f1f77bcf86cd799439011",
  "tags": ["mongodb", "nodejs", "database"],
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "content": "Great article!",
      "createdAt": "2025-11-17T11:00:00Z"
    }
  ],
  "publishedAt": "2025-11-17T10:30:00Z",
  "createdAt": "2025-11-17T10:30:00Z",
  "updatedAt": "2025-11-17T11:00:00Z"
}
```

---

## 🔄 API Endpoints & Data Flow

### **Users Endpoints**

| Method | Endpoint         | Purpose         | Request Body                         |
| ------ | ---------------- | --------------- | ------------------------------------ |
| GET    | `/api/users`     | Get all users   | -                                    |
| GET    | `/api/users/:id` | Get single user | -                                    |
| POST   | `/api/users`     | Create user     | `{name, email, phone, age, address}` |
| PUT    | `/api/users/:id` | Update user     | `{name, email, phone, age, address}` |
| DELETE | `/api/users/:id` | Delete user     | -                                    |

### **Posts Endpoints**

| Method | Endpoint                                 | Purpose                   | Request Body                  |
| ------ | ---------------------------------------- | ------------------------- | ----------------------------- |
| GET    | `/api/posts`                             | Get all posts (paginated) | -                             |
| GET    | `/api/posts?limit=10&page=1`             | Paginate posts            | -                             |
| GET    | `/api/posts/:id`                         | Get single post           | -                             |
| POST   | `/api/posts`                             | Create post               | `{title, body, author, tags}` |
| PUT    | `/api/posts/:id`                         | Update post               | `{title, body, author, tags}` |
| DELETE | `/api/posts/:id`                         | Delete post               | -                             |
| POST   | `/api/posts/:id/comments`                | Add comment               | `{name, email, content}`      |
| PUT    | `/api/posts/:postId/comments/:commentId` | Update comment            | `{name, email, content}`      |
| DELETE | `/api/posts/:postId/comments/:commentId` | Delete comment            | -                             |

---

## 📝 Data Validation Rules

### User Validation:

- **Name**: Required, 2-50 characters
- **Email**: Required, unique, valid email format
- **Phone**: Optional, digits and symbols only
- **Age**: Optional, 0-150
- **Address**: Optional text field

### Post Validation:

- **Title**: Required string
- **Body**: Required string
- **Author**: Optional ObjectId (must reference existing user)
- **Tags**: Optional array of strings

---

## 🛠️ How to Use the Client

### Step 1: Start Your Server

```bash
npm run dev
```

### Step 2: Open the Client

1. Save the HTML file as `client.html`
2. Open it in your browser (or use Live Server)
3. Your server should be running on `http://localhost:5000`

### Step 3: Create a User

- Fill in the "Add New User" form
- Click "Create User"
- The new user will appear in the "All Users" section

### Step 4: Create a Post

- Fill in the "Add New Post" form
- Optionally add the Author ID (copy from Users section)
- Add tags separated by commas
- Click "Create Post"

### Step 5: View Data

- All users and posts are displayed automatically
- Click "Refresh" to reload data from database
- Click "Copy ID" to copy user/post IDs
- Click "Delete" to remove individual items

---

## 💡 Important Features

### 1. **Data Relationships**

Posts reference Users through the `author` field:

```javascript
POST.author -> USER._id
```

### 2. **Nested Data (Subdocuments)**

Comments are embedded directly in Posts (no separate collection needed):

```
Post {
  comments: [
    { name, email, content, createdAt },
    { name, email, content, createdAt }
  ]
}
```

### 3. **Timestamps**

All collections automatically track:

- `createdAt`: When document was created
- `updatedAt`: When document was last modified

### 4. **Pagination**

Posts support pagination:

```
GET /api/posts?limit=10&page=1
Returns: { posts: [...], total: 100, page: 1, limit: 10 }
```

---

## 🔐 Error Handling

The system handles:

- **Validation errors**: Required fields, format validation
- **Duplicate emails**: Prevents duplicate user emails
- **Invalid references**: Checks if author ID exists
- **Not found errors**: Returns 404 for missing records
- **Server errors**: Returns 500 with error message

---

## 🚀 Next Steps

To extend your database, consider adding:

1. **Categories for Posts**

```javascript
category: { type: String, enum: ['Tech', 'Lifestyle', 'Business'] }
```

2. **User Roles**

```javascript
role: { type: String, enum: ['admin', 'user'], default: 'user' }
```

3. **Post Likes/Comments Counter**

```javascript
likesCount: { type: Number, default: 0 },
commentsCount: { type: Number, default: 0 }
```

4. **Search Indexes**

```javascript
usersSchema.index({ email: 1 });
usersSchema.index({ name: "text" }); // For text search
postSchema.index({ title: "text", body: "text" }); // Full-text search
```

---

## 📚 MongoDB Commands (Node.js)

```javascript
// Find
const users = await User.find();
const user = await User.findById(id);
const user = await User.findOne({ email: "john@example.com" });

// Create
const newUser = await User.create({ name, email });

// Update
const updated = await User.findByIdAndUpdate(id, data, { new: true });

// Delete
const deleted = await User.findByIdAndDelete(id);

// Count
const total = await User.countDocuments();

// Populate (for references)
const post = await Post.findById(id).populate("author", "name email");
```

---

## ✅ Data Flow Summary

1. **Client (HTML)** → Sends form data via fetch
2. **Server (Express)** → Receives and validates data
3. **Database (MongoDB)** → Stores/retrieves data
4. **Server** → Returns response to client
5. **Client** → Displays data in real-time

---

## 🔗 Connection String

Make sure your `.env` file has:

```
DATABASE_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=5000
```

Replace with your actual MongoDB connection string from MongoDB Atlas.
