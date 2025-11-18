# 💻 Code Snippets & Examples

## Quick Copy-Paste Examples

---

## 1️⃣ Create a New User (JavaScript)

```javascript
async function createUser(userData) {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        age: userData.age,
        address: userData.address,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ User created:", result.user);
      return result.user;
    } else {
      console.error("❌ Error:", result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
createUser({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1-555-1234",
  age: 28,
  address: "123 Main St",
});
```

---

## 2️⃣ Get All Users (JavaScript)

```javascript
async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    const users = await response.json();

    if (response.ok) {
      console.log("✅ Users fetched:", users);
      return users;
    } else {
      console.error("❌ Error:", users.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
const users = await getAllUsers();
users.forEach((user) => {
  console.log(`${user.name} - ${user.email}`);
});
```

---

## 3️⃣ Get Single User (JavaScript)

```javascript
async function getUser(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
    const user = await response.json();

    if (response.ok) {
      console.log("✅ User found:", user);
      return user;
    } else {
      console.error("❌ User not found");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
const user = await getUser("507f1f77bcf86cd799439011");
console.log(user.name);
```

---

## 4️⃣ Update User (JavaScript)

```javascript
async function updateUser(userId, updateData) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ User updated:", result);
      return result;
    } else {
      console.error("❌ Error:", result.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
updateUser("507f1f77bcf86cd799439011", {
  age: 30,
  phone: "+1-555-5678",
});
```

---

## 5️⃣ Delete User (JavaScript)

```javascript
async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ User deleted:", result.message);
      return true;
    } else {
      console.error("❌ Error:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
const deleted = await deleteUser("507f1f77bcf86cd799439011");
```

---

## 6️⃣ Create a Post (JavaScript)

```javascript
async function createPost(postData) {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postData.title,
        body: postData.body,
        author: postData.author, // User ID (optional)
        tags: postData.tags, // Array of strings
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Post created:", result);
      return result;
    } else {
      console.error("❌ Error:", result.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
createPost({
  title: "My First Post",
  body: "This is the content of my post...",
  author: "507f1f77bcf86cd799439011",
  tags: ["nodejs", "mongodb", "express"],
});
```

---

## 7️⃣ Get Posts with Pagination (JavaScript)

```javascript
async function getPosts(limit = 10, page = 1) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts?limit=${limit}&page=${page}`
    );

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Posts fetched:");
      console.log(`- Posts: ${data.posts.length}`);
      console.log(`- Total: ${data.total}`);
      console.log(
        `- Page: ${data.page} of ${Math.ceil(data.total / data.limit)}`
      );
      return data;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
const postsData = await getPosts(5, 1); // 5 posts per page, page 1
postsData.posts.forEach((post) => {
  console.log(post.title);
});
```

---

## 8️⃣ Add Comment to Post (JavaScript)

```javascript
async function addComment(postId, commentData) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: commentData.name,
          email: commentData.email,
          content: commentData.content,
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Comment added:", result);
      return result;
    } else {
      console.error("❌ Error:", result.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage:
addComment("507f1f77bcf86cd799439012", {
  name: "Alice",
  email: "alice@example.com",
  content: "Great post! Thanks for sharing.",
});
```

---

## 9️⃣ Form Submission Handler (JavaScript)

```javascript
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, age }),
    });

    const data = await response.json();

    if (response.ok) {
      // Success
      document.getElementById("message").textContent = "✅ User created!";
      document.getElementById("message").style.color = "green";
      document.getElementById("userForm").reset(); // Clear form
      // Reload data
      loadUsers();
    } else {
      // Error
      document.getElementById("message").textContent = "❌ " + data.message;
      document.getElementById("message").style.color = "red";
    }
  } catch (error) {
    document.getElementById("message").textContent = "❌ " + error.message;
    document.getElementById("message").style.color = "red";
  }
});
```

---

## 🔟 Display Data in HTML (JavaScript)

```javascript
async function displayUsers() {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    const users = await response.json();

    const container = document.getElementById("usersList");

    if (users.length === 0) {
      container.innerHTML = "<p>No users found</p>";
      return;
    }

    // Create HTML for each user
    container.innerHTML = users
      .map(
        (user) => `
      <div class="user-card">
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        ${user.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ""}
        ${user.age ? `<p><strong>Age:</strong> ${user.age}</p>` : ""}
        <button onclick="deleteUser('${user._id}')">Delete</button>
        <button onclick="copyID('${user._id}')">Copy ID</button>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

function copyID(id) {
  navigator.clipboard.writeText(id);
  alert("ID copied!");
}
```

---

## 1️⃣1️⃣ Error Handling Utility (JavaScript)

```javascript
function showError(message, elementId = "error-message") {
  const element = document.getElementById(elementId);
  element.textContent = "❌ " + message;
  element.style.display = "block";
  element.style.color = "red";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

function showSuccess(message, elementId = "success-message") {
  const element = document.getElementById(elementId);
  element.textContent = "✅ " + message;
  element.style.display = "block";
  element.style.color = "green";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

// Usage:
try {
  const response = await fetch("...");
  if (!response.ok) throw new Error(data.message);
  showSuccess("Data saved!");
} catch (error) {
  showError(error.message);
}
```

---

## 1️⃣2️⃣ Validation Helper (JavaScript)

```javascript
const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  phone: (phone) => {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(phone);
  },

  age: (age) => {
    return age >= 0 && age <= 150;
  },

  name: (name) => {
    return name.length >= 2 && name.length <= 50;
  },
};

// Usage:
if (!validators.email("john@example.com")) {
  showError("Invalid email format");
}

if (!validators.age(28)) {
  showError("Age must be 0-150");
}

if (!validators.name("Jo")) {
  showError("Name must be 2-50 characters");
}
```

---

## 1️⃣3️⃣ Server-Side: User Route Handler (Node.js)

```javascript
const express = require("express");
const User = require("../Models/userModel");
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, age, address } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      phone,
      age,
      address,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
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

module.exports = router;
```

---

## 1️⃣4️⃣ Server-Side: Get Users (Node.js)

```javascript
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

---

## 1️⃣5️⃣ HTML Form Template

```html
<form id="userForm">
  <div>
    <label for="name">Name *</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder="Enter full name"
    />
  </div>

  <div>
    <label for="email">Email *</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="Enter email"
    />
  </div>

  <div>
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone" placeholder="Enter phone" />
  </div>

  <div>
    <label for="age">Age</label>
    <input
      type="number"
      id="age"
      name="age"
      min="0"
      max="150"
      placeholder="Enter age"
    />
  </div>

  <button type="submit">Create User</button>
</form>

<div id="message"></div>

<ul id="usersList">
  <!-- Users will appear here -->
</ul>
```

---

## Summary

These snippets cover:

- ✅ CREATE (POST)
- ✅ READ (GET)
- ✅ UPDATE (PUT)
- ✅ DELETE (DELETE)
- ✅ Comments
- ✅ Form handling
- ✅ Error handling
- ✅ Validation
- ✅ HTML display
- ✅ Server routes

Copy-paste any of these into your project! 🚀
