import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

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
  console.log(token);
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