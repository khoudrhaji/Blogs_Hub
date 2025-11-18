const express = require("express");
const User = require("../Models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Missing id" });
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, age, address } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

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
    console.log(error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user: deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// router.delete('/', (req, res) => {
//     res.send("DELETE DATA")
// })
// router.put('/', (req, res) => {
//     res.send("PUT DATA")
// })

module.exports = router;
