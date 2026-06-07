const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  addUser,
  getAllUsers,
  getUserById
} = require("../controllers/userController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboardStats
);

router.post(
  "/add-user",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addUser
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUserById
);

module.exports = router;