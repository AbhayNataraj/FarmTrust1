const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const agriRoutes = require("./src/routes/agriRoutes");
const userRoutes = require("./src/routes/userRoutes");
const producerRoutes = require("./src/routes/producerRoutes");
const distributorRoutes = require("./src/routes/distributorRoutes");
const retailerRoutes = require("./src/routes/retailerRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Require the necessary modules for setting up the database
const connectDB = require("./config/database");
//const seedDatabase = require("./config/seed");

// Routes
app.use("/agris", agriRoutes);
app.use("/users", userRoutes);
app.use("/producers", producerRoutes);
app.use("/distributors", distributorRoutes);
app.use("/retailers", retailerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blockchain-based Supply Chain API!");
});

// Start the server
app.listen(port, async () => {
  console.log(`Server started on port ${port}`);

  // Set up the database and seed it with sample data
  try {
    await connectDB();
    //await seedDatabase();
    console.log("Database synced successfully");
  } catch (error) {
    console.log(error);
    console.log("Error setting up database");
  }
});
