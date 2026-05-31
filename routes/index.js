
const router = require("express").Router();
const { getItems } = require("../controllers/clothingItem");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateSignin, validateSignup } = require("../middlewares/validator");


const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

const NotFoundError = require("../errors/NotFoundError");

router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.get("/items", getItems);
router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
