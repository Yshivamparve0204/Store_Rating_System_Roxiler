const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const storeRoutes = require("./routes/storeRoute");
const ratingRoutes = require("./routes/ratingRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);

module.exports = app;