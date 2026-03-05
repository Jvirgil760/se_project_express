
const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", createItem);
// Read
router.get("/", getItems);
// Delete
router.delete("/:itemId", deleteItem);

router.use(auth);

// likes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
