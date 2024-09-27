const router = require("express").Router();
const User = require("../models/user");

//Create new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

//Get user by name
router.get("/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

//Update user by name
router.put("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { email, password } = req.body;

    // Update the user by name
    const updatedUser = await User.findOneAndUpdate(
      { name: name },
      { email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const {name} = req.params;

    const deleteUser = await User.findOneAndDelete({name:name});
    if(!deleteUser){
        return res.sendStatus(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User deleted successfully"})

  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

module.exports = router;
