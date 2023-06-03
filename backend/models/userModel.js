import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  about: {
    type: String,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
  },
  // admin:{
  //     default:false
  // },
  profile: {
    type: String,
    default: "avatar.png",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
