import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function validate() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      let { data } = await axios.post("/login", { email, password });
      if (!data.error) {
        dispatch({ type: "refresh" });
      } else {
        toast.error(data.message);
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Log In
        </Typography>
        <ToastContainer />
        <form onClick={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={validate()}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" marginTop={1}>
            Don't have an account?
            <Link to="/register">Register</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
