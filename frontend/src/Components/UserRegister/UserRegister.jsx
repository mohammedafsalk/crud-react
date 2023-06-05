import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function UserRegister() {
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
        <form>
          <TextField
            label="Username"
            // value={username}
            // onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            // value={username}
            // onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            // value={password}
            // onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
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
