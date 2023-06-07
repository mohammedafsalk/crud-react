import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      let { data } = await axios.post("/admin/create-user", {
        name,
        email,
        password,
      });
      if (!data.error) {
        navigate("/admin/");
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
          Create an User
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
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateUser;
