const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
