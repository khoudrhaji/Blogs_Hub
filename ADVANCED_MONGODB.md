# Advanced MongoDB Queries & Management

## 🎯 MongoDB Query Examples

All these queries can be used in your Node.js routes:

### User Queries

```javascript
// Find all users
const allUsers = await User.find();

// Find users with specific criteria
const activeUsers = await User.find({ isActive: true });

// Find user by email
const user = await User.findOne({ email: "john@example.com" });

// Find and sort
const usersSorted = await User.find().sort({ createdAt: -1 }); // Newest first

// Find with pagination
const users = await User.find().skip(10).limit(5); // Gets users 10-15

// Find with specific fields only
const userEmails = await User.find({}, { email: 1, name: 1 });

// Count documents
const totalUsers = await User.countDocuments();

// Count with criteria
const activeCount = await User.countDocuments({ isActive: true });

// Update one
await User.findByIdAndUpdate(userId, { age: 30 }, { new: true });

// Update multiple
await User.updateMany({ isActive: false }, { isActive: true });

// Delete one
await User.findByIdAndDelete(userId);

// Delete multiple
await User.deleteMany({ isActive: false });
```

### Post Queries

```javascript
// Find all posts with author details
const posts = await Post.find().populate("author");

// Populate specific author fields
const posts = await Post.find().populate("author", "name email");

// Find posts by author
const userPosts = await Post.find({ author: userId }).populate("author");

// Find posts by tag
const techPosts = await Post.find({ tags: "nodejs" });

// Find posts with multiple tags
const posts = await Post.find({ tags: { $in: ["nodejs", "mongodb"] } });

// Find posts with date range
const recentPosts = await Post.find({
  publishedAt: {
    $gte: new Date("2025-01-01"),
    $lte: new Date("2025-12-31"),
  },
});

// Pagination
const page = 2;
const limit = 10;
const skip = (page - 1) * limit;
const posts = await Post.find()
  .sort({ publishedAt: -1 })
  .skip(skip)
  .limit(limit);

// Get total count for pagination
const total = await Post.countDocuments();

// Search in title and body
const searchResults = await Post.find({
  $text: { $search: "mongodb" },
}); // Requires text index

// Sort by multiple fields
const posts = await Post.find().sort({ publishedAt: -1, title: 1 });

// Get posts with comment count
const posts = await Post.find().select("title body author comments");
```

---

## 🔍 Advanced Filtering

### Comparison Operators

```javascript
// Greater than
const posts = await Post.find({ commentsCount: { $gt: 5 } });

// Less than
const users = await User.find({ age: { $lt: 30 } });

// Greater than or equal
const users = await User.find({ age: { $gte: 18 } });

// Less than or equal
const users = await User.find({ age: { $lte: 65 } });

// Not equal
const users = await User.find({ role: { $ne: "admin" } });

// In array
const posts = await Post.find({ status: { $in: ["published", "draft"] } });

// Not in array
const users = await User.find({ role: { $nin: ["admin", "moderator"] } });
```

### Logical Operators

```javascript
// OR operator
const results = await User.find({
  $or: [{ age: { $lt: 18 } }, { age: { $gt: 65 } }],
});

// AND operator (implicit)
const results = await User.find({
  age: { $gte: 18 },
  isActive: true,
});

// NOT operator
const results = await User.find({
  email: { $not: /gmail\.com$/ },
});
```

---

## 📊 Aggregation Pipeline

```javascript
// Group users by age
const ageGroups = await User.aggregate([
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 },
      names: { $push: "$name" },
    },
  },
  { $sort: { _id: 1 } },
]);

// Count posts by author
const authorStats = await Post.aggregate([
  {
    $group: {
      _id: "$author",
      postCount: { $sum: 1 },
      avgComments: { $avg: { $size: "$comments" } },
    },
  },
  { $sort: { postCount: -1 } },
]);

// Get most used tags
const tagStats = await Post.aggregate([
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$tags",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 10 },
]);

// Complex pipeline with lookup
const postsWithAuthorDetails = await Post.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "authorDetails",
    },
  },
  { $unwind: "$authorDetails" },
  {
    $project: {
      title: 1,
      body: 1,
      "authorDetails.name": 1,
      "authorDetails.email": 1,
      commentCount: { $size: "$comments" },
    },
  },
]);
```

---

## 🔐 Validation & Error Handling

### Custom Validation Example

```javascript
// In your model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  age: {
    type: Number,
    validate: {
      validator: function (v) {
        return v >= 0 && v <= 150;
      },
      message: "Age must be between 0 and 150",
    },
  },
});

// In your route with error handling
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate(); // Validates before saving
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ message: error.message });
  }
});
```

---

## 📈 Indexing for Performance

```javascript
// Create indexes in your model files
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true, // Create index on email
    unique: true // Also unique constraint
  },
  name: {
    type: String,
    index: true // Create index on name
  }
});

// Text index for search
const postSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String }
});
postSchema.index({ title: 'text', body: 'text' }); // Full-text search

// Compound indexes
const postSchema = new mongoose.Schema({...});
postSchema.index({ author: 1, publishedAt: -1 }); // Find by author, sorted by date

// TTL index (auto-delete after X seconds)
const sessionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Expires after 1 hour
  }
});
```

---

## 🛠️ Data Migration & Backup

### Export Data to JSON

```javascript
// Create a route to export users
router.get("/export/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
  // Save this JSON for backup
});

// Export posts
router.get("/export/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});
```

### Import Data from JSON

```javascript
router.post("/import/users", async (req, res) => {
  try {
    const users = req.body; // Array of user objects
    const result = await User.insertMany(users);
    res.json({ message: `Imported ${result.length} users`, result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

---

## 📋 Useful MongoDB Atlas Features

### Connection String Options

```
mongodb+srv://user:password@cluster.mongodb.net/db?
  retryWrites=true&
  w=majority&
  maxPoolSize=10&
  serverSelectionTimeoutMS=5000
```

### Monitoring

1. Go to MongoDB Atlas Dashboard
2. Check "Performance Advisor"
3. View slow queries
4. Analyze index usage
5. Monitor database size

---

## ✅ Best Practices

1. **Always validate before saving**

   ```javascript
   await user.validate(); // Catches errors early
   ```

2. **Use try-catch blocks**

   ```javascript
   try { ... } catch(error) { ... }
   ```

3. **Pagination for large datasets**

   ```javascript
   .skip((page - 1) * limit).limit(limit)
   ```

4. **Create indexes on frequently queried fields**

   ```javascript
   schema.index({ email: 1 });
   ```

5. **Use lean() for read-only queries** (faster)

   ```javascript
   User.find().lean(); // Returns plain objects, not Mongoose documents
   ```

6. **Populate only needed fields**

   ```javascript
   Post.find().populate("author", "name email"); // Not all fields
   ```

7. **Handle errors properly**
   ```javascript
   if (error.name === 'ValidationError') { ... }
   if (error.code === 11000) { ... } // Duplicate key
   ```

---

## 🐛 Common MongoDB Errors & Solutions

| Error                      | Cause                    | Solution                                |
| -------------------------- | ------------------------ | --------------------------------------- |
| `MongoServerError: E11000` | Duplicate unique field   | Check email/unique fields               |
| `ValidationError`          | Schema validation failed | Review required fields                  |
| `CastError`                | Invalid ObjectId format  | Use `mongoose.Types.ObjectId.isValid()` |
| `Connection Refused`       | MongoDB not running      | Start MongoDB service                   |
| `Authentication failed`    | Wrong credentials        | Check `.env` connection string          |

---

## 🚀 Performance Tips

1. **Use lean() for read-only operations**

   ```javascript
   const users = await User.find().lean();
   ```

2. **Batch operations**

   ```javascript
   await User.insertMany([user1, user2, user3]);
   ```

3. **Limit returned fields**

   ```javascript
   await User.find({}, { email: 1, name: 1 });
   ```

4. **Create indexes on query fields**

   ```javascript
   schema.index({ status: 1 });
   ```

5. **Use aggregation for complex queries**
   ```javascript
   await Post.aggregate([...pipeline...]);
   ```

Enjoy building! 🎉
