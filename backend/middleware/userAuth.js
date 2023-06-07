import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

async function CheckAuthUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ error: true, message: "No token" });

    const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
    const user = await UserModel.findById(verifiedJWT.id);
    if (!user) {
      return res.json({ error: true, message: "Unauthorized" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
}

export default CheckAuthUser;
