import UserModel from "../models/userModel.js";

export const editProfile = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.id, {
      $set: {
        profile: req.file.filename,
      },
    });
    return res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: "Something went wrong" });
  }
};
