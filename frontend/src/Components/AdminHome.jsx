import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AdminHeader from "./AdminHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const StyledTableContainer = styled(TableContainer)`
  margin: 0 auto;
  max-width: 600px;
`;

function AdminHome() {
  const [user, setUser] = useState([]);
  const [find, SetFind] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const baseImgUrl = "http://localhost:5000/uploads/";

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/admin/users?search=" + search);
      setUser(data);
    })();
  }, [search, refresh]);

  async function Userdelete(id) {
    await axios.get(`/admin/delete-user/${id}`);
    setRefresh(!refresh);
  }

  return (
    <>
      <AdminHeader search={search} setSearch={setSearch} />
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={baseImgUrl + row.profile}
                    alt={row.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <Link to={`/admin/update-user/${row._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => Userdelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      );
    </>
  );
}

export default AdminHome;
