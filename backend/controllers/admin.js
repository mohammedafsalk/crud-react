import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { json } from "express";

var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await UserModel.findOne({ email, admin: true });
    if (!admin) {
      return res.json({ error: true, message: "Access Denied" });
    }
    const verified = bcrypt.compareSync(password, admin.password);
    if (!verified) {
      return res.json({ error: true, message: "Invalid Email Or Password" });
    }
    const token = jwt.sign(
      {
        admin: true,
        id: admin._id,
      },
      "myjwtsecretkey"
    );
    return res
      .cookie("adminToken", token, {
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

export async function adminAuth(req, res) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.json({
      loggedIn: false,
      error: true,
      message: "Token Not Found",
    });
  }
  const verified = jwt.verify(token, "myjwtsecretkey");
  return res.json({ loggedIn: true });
}

export async function adminLogout(req, res) {
  try {
    res
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ message: "logged out", error: false });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function getUsers(req, res) {
  let users = await UserModel.find(
    { admin: { $ne: true } },
    { password: 0 }
  ).lean();
  return res.json(users);
}

export async function getUser(req, res) {
  let user = await UserModel.findById(req.params.id);
  res.json(user);
}

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ error: true, message: "User Already Exist" });
    }
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword
    });
    await newUser.save();
    return res.json({ error: false, message: "success" });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email, id } = req.body;
    await UserModel.findByIdAndUpdate(id, {
      $set: { name, email, about, profession },
    });
    return res.json({ error: false });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function deleteUser(req, res) {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ error: false, message: "user deleted" });
}
