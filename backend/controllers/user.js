import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function userReg(req, res) {
  try {
    const { name, email, password, about, profession } = req.body;
    const hashPassword =  bcrypt.hashSync(password, salt);
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ error: true, message: "User Already Registered!" });
    }
    const newUser = new UserModel({
      name,
      email,
      password:hashPassword,
      about, 
      profession,
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
    res.json({ error: error});
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: "User Not Found" });
    }
    const validate =  await bcrypt.compareSync(password, user.password);
    if (!validate) {
      return res.json({ error: true, message: "Email or Password is Wrong" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      "myjwtsecretkey"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
        sameSite: "none",
      })
      .json({ error: false, user: user._id });
  } catch (error) {
    res.json({ error: error.message});
  }
}
