import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: String,
    default: "avatar.png",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
