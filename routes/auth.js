const express = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User With This Email Already Exists !" });
    }

    const hashPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({msg: 'User With THis Email Does Not Exist !'});
    }
    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({msg: 'Password Is Incorrect !'});
    }
    const token = jwt.sign({id: user._id}, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

module.exports = authRouter;
