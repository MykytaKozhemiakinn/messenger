const router = require("express").Router();

const { userRegister } = require("../controller/auth.controller");
router.post("/user/register", userRegister);

module.exports = router;
