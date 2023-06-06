import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function validate() {
    if (email.replaceAll(" ", "") === "" || name.replaceAll(" ", "") === "") {
      return true;
    }
    return false;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/admin/update-user", {
      name,
      email,
      id,
    });
    navigate("/admin/");
  };

  useEffect(() => {
    (async function () {
      let { data } = await axios.get(`/admin/user/${id}`);
      setName(data.name);
      setEmail(data.email);
    })();
  }, []);

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
          Edit
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="UserName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}

export default EditUser;
