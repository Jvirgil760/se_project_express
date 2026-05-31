const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");

const { validateUpdateUser } = require("../middlewares/validator");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUser, updateCurrentUser);

module.exports = router;
