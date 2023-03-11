const express = require("express");
const {
  Login,
  Register,
  Create,
  Posts,
  userPosts,
  Pitcure,
} = require("./controller");

const router = express.Router();
require("./server");

router.post("/login", Login);

router.post("/register", Register);

router.post("/create", Create);

router.post("/posts", Posts);

router.post("/userposts", userPosts);

router.post("/picture", Pitcure);
module.exports = router;
