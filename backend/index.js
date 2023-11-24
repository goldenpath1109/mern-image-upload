const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose
	.connect(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});

// Routes
const userRouter = require("./routes/user");
app.use("/users", userRouter);
app.use("/public", express.static("public"));

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
