import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import UserHome from "./Components/userHome/UserHome";
import UserLogin from "./Components/userLogin/UserLogin";
import UserRegister from "./Components/UserRegister/UserRegister";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminHome from "./Components/AdminHome";
import AdminLogin from "./Components/AdminLogin";
import EditUser from "./Components/EditUser";
import AdminCreateUser from "./Components/AdminCreateUser";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, admin, refresh } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/checkAuth");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });

      let { data: admindata } = await axios.get("/admin/adminAuth");
      console.log(admindata);
      dispatch({ type: "admin", payload: { login: admindata.loggedIn } });
    })();
  }, [refresh]);

  return (
    <Router>
      {user.login === false && (
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
      {user.login === true && (
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Navigate to="/" replace={true} />} />
          <Route
            path="/register"
            element={<Navigate to="/" replace={true} />}
          />
        </Routes>
      )}
      {admin.login === true && (
        <Routes>
          <Route path="/admin/" element={<AdminHome/>}/>
          <Route path="/admin/create-user" element={<AdminCreateUser/>} />
          <Route path="/admin/update-user/:id" element={<EditUser/>} />
          <Route path="/admin/*" element={<Navigate to='/admin/' replace={true} />} />
        </Routes>
      )}
      {admin.login === false && (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={<Navigate to="/admin/login" replace={true} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
