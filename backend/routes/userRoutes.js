import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          cartItems: user.cartItems,
          token: generateToken(user),
        });
        return;
      }
    }

    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

// userRouter.get(
//   "/cart",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.cartItems = req.body.cartItems.map((x) => ({
//         ...x,
//         product: x._id,
//       }));
//       await user.save();
//       res.send({ message: "Shopping Cart Added" });
//     } else {
//       res.status(404).send({ message: "User Not Found" });
//     }
//   })
// );

userRouter.put(
  "/addcart",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.cartItems = req.body.cartItems.map((x) => ({
        ...x,
        product: x._id,
      }));
      await user.save();
      res.send({ message: "Shopping Cart Added" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// userRouter.delete(
//   "/clearcart",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.cartItems = [];
//       await user.save();
//       res.send({ message: "Shopping Cart Cleared" });
//     } else {
//       res.status(404).send({ message: "User Not Found" });
//     }
//   })
// );

export default userRouter;
