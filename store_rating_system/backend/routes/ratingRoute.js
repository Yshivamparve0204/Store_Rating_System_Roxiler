const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
 submitRating,
 ownerDashboard
}
= require("../controllers/ratingController");

router.post(
 "/",
 authMiddleware,
 roleMiddleware("USER"),
 submitRating
);

router.get(
 "/owner-dashboard",
 authMiddleware,
 roleMiddleware("OWNER"),
 ownerDashboard
);

module.exports = router;