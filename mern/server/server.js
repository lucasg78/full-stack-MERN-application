const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// MongoDB connection string
const uri = process.env.ATLAS_URI;

async function connectToMongoDB() {

  // Disable deprecation warnings for useNewUrlParser and useUnifiedTopology
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // Perform operations with the client if needed
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process on connection failure
  } finally {
    // Close the MongoDB connection when you're done with it
    await client.close();
  }
}

app.listen(port, async () => {
  // Perform the MongoDB connection when the server starts
  await connectToMongoDB();
  console.log(`Server is running on port: ${port}`);
});
