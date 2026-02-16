const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors")

const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
