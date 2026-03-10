
const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", createItem);
// Delete
router.delete("/:itemId", deleteItem);

// likes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
