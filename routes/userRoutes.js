const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (userPresent) res.send("User already registered, Login now");
    else {
      const hashPass = await bcrypt.hash(password, +process.env.SALT);
      const newUser = new userModel({
        email,
        password: hashPass,
      });
      await newUser.save();
      res.status(201).send({
        message: "New User Registered",
        newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (!userPresent) res.send("User not registered, Registe First");
    else {
      const isPassCorrect = bcrypt.compareSync(password, userPresent.password);
      if (!isPassCorrect) res.send("Wrong credential");
      const accessToken = jwt.sign(
        {
          userId: userPresent._id,
          email: userPresent.email,
        },
        process.env.SECRETKEY,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );
      res.status(201).send({
        message: "User Login Successfull",
        accessToken,
        userPresent,
        OK: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = { userRouter };
