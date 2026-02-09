
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const router = require("express").Router();
//CRUD

//Create
router.post("/", createItem);
//Read
router.get("/", getItems);
//Delete
router.delete("/:itemId", deleteItem);

// likes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
