import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const UserHome = () => {
  const dispatch = useDispatch();
  const baseImgUrl = "http://localhost:5000/uploads/";
  const value = useSelector((state) => {
    return state.user;
  });

  async function handleLogout() {
    let data = await axios.get("/logout");
    console.log(data);
    dispatch({ type: 'refresh' });
  }

  return (
    <Card
      sx={{
        maxWidth: 400,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CardContent>
        <Avatar
          src={baseImgUrl + value.details.profile}
          alt=""
          sx={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 2,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Typography variant="h4" component="div" align="center" gutterBottom>
          {value.details.name}
        </Typography>
        <Typography color="text.secondary" align="center" gutterBottom>
          {value.details.email}
        </Typography>
        <Button variant="contained" fullWidth sx={{ marginBottom: 1 }}>
          Change Photo
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ marginBottom: 1 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserHome;
