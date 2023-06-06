import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";

const StyledAppBar = styled(AppBar)`
  background-color: #333;
`;

function AdminHeader({ search, setSearch }) {
  const dispatch = useDispatch();

  async function logOut() {
    await axios.get("/admin/logout");
    dispatch({ type: "refresh" });
  }

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          Admin
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300, mr: 5 }}
          InputProps={{
            sx: { color: "white" },
          }}
        />
        <Button onClick={logOut} color="inherit" sx={{ color: "white" }}>
          Add User
        </Button>
        <Button onClick={logOut} color="inherit" sx={{ color: "white" }}>
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}

export default AdminHeader;
