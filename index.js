const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Create an Express app
const app = express();

//middleware to parse JSON request
app.use(express.json());

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "practiseDB",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//Import routes
const userRoutes = require("./routes/userRoute");

// Use routes
app.use("/api/users", userRoutes);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
