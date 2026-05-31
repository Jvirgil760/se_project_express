
const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const { validateCreateItem, validateItemId } = require("../middlewares/validator");

// CRUD

// Create
router.post("/", validateCreateItem, createItem);
// Delete
router.delete("/:itemId", validateItemId, deleteItem);

// likes
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, unlikeItem);

module.exports = router;
