import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

async function CheckAuthAdmin(req, res, next) {
  try {
    const token = req.cookies.adminToken;
    if (!token) return res.json({ error: true, message: "no token" });

    const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
    const admin = await UserModel.findOne(
      { _id: verifiedJWT.id, admin: true },
      { password: 0 }
    );
    if (!admin) {
      return res.json({ error: true, message: "Unauthorized" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
}

export default CheckAuthAdmin;
