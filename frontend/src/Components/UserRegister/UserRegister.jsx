import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";

function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage]=useState(null)


  const dispatch = useDispatch();

  function validate() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      let { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (!data.error) {
        dispatch({ type: "refresh" });
      } else {
        setErrMessage(data.message);
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
          Register Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
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
            Save
          </Button>
          <Typography variant="body2" align="center" marginTop={1}>
            Have an account?{" "}
            <Link href="/login" underline="none">
              Log In
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
