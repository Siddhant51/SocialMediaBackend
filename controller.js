const { User, Post } = require("./schema");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "Plz fill all fields" });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("Login successful");
        res.send({ user });
      } else {
        console.log("Invalid credentials");
      }
    }
  }
};

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ error: "Plz fill all fields" });
  }

  const userExist = await User.findOne({ email: email });
  try {
    if (!userExist) {
      const user = new User({ name, email, password });
      // bcrypt middleware
      await user.save();
      res.send({ message: "User registered" });
    } else {
      res.send({ message: "User already exists" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const Pitcure = async (req, res) => {
  const { userId, profilePic } = req.body;

  const user = await User.findByIdAndUpdate(userId, { profilePic });
  try {
    if (user) {
      res.send({ message: "Updated successfully" });
    } else {
      res.send({ message: "Update was unsuccessful" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const Create = async (req, res) => {
  const { content, media, userId } = req.body;

  try {
    if (!content && !media) {
      return res.json({ error: "Plz enter atleast one field" });
    } else {
      const post = new Post({ content, media, user: userId });
      await post.save();
      res.send({ message: "Posted successfully" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const Posts = async (req, res) => {
  const { userId } = req.body;

  try {
    const posts = await Post.find({ user: { $ne: userId } }).populate("user");
    res.send({ posts });
  } catch (error) {
    console.log({ error });
  }
};

const userPosts = async (req, res) => {
  const { userId } = req.body;

  try {
    const posts = await Post.find({ user: userId }).populate("user");
    res.send({ posts });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { Login, Register, Create, Posts, userPosts, Pitcure };
