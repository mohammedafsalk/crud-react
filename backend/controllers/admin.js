import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { json } from "express";

var salt = bcrypt.genSaltSync(10);

export async function getUsers(req, res) {
  let users = await UserModel.find(
    { admin: { $ne: true }, name: new RegExp(req.query.search, "i") },
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
      password: hashPassword,
    });
    await newUser.save();
    return res.json({ error: false, message: "success" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email, id } = req.body;
    await UserModel.findByIdAndUpdate(id, {
      $set: { name, email },
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
