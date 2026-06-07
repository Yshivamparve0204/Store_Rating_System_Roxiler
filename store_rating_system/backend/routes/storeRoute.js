const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
 addStore,
 getAllStores,
 getStoreById
}
= require("../controllers/storeController");

router.post(
 "/",
 authMiddleware,
 roleMiddleware("ADMIN"),
 addStore
);

router.get(
 "/",
 authMiddleware,
 getAllStores
);

router.get(
 "/:id",
 authMiddleware,
 getStoreById
);

module.exports = router;