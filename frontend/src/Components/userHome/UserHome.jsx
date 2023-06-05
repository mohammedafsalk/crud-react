import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

const UserHome = () => {
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
          src=""
          alt=''
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
          user.name
        </Typography>
        <Typography color="text.secondary" align="center" gutterBottom>
          user.jobTitle
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          user.bio
        </Typography>
        <Button variant="contained" fullWidth sx={{ marginBottom: 1 }}>
          Change Photo
        </Button>
        <Button variant="outlined" color="error" fullWidth sx={{ marginBottom: 1 }}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserHome;
