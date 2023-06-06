import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function userReg(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ error: true, message: "User Already Registered!" });
    }
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      "myjwtsecretkey"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ error: false });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: "User Not Found" });
    }
    const validate = bcrypt.compareSync(password, user.password);
    if (!validate) {
      return res.json({ error: true, message: "Email or Password is Wrong" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      "myjwtsecretkey"
    );
    console.log(token);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
        sameSite: "none",
      })
      .json({
        error: false,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function checkLogin(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        loggedIn: false,
        error: true,
        message: "Token Not Found",
      });
    }
    const verified = jwt.verify(token, "myjwtsecretkey");
    const user = await UserModel.findById(verified.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    return res.json({ user, loggedIn: true });
  } catch (error) {
    res.json({ loggedIn: false, error: error });
  }
}

export const userLogout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ message: "logged out", error: false });
  } catch (error) {
    res.json({ error: error });
  }
};