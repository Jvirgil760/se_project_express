const router = require("express").Router();
const { updateProfile, getCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;
