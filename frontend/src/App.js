import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import UserHome from "./Components/userHome/UserHome";
import UserLogin from "./Components/userLogin/UserLogin";
import UserRegister from "./Components/UserRegister/UserRegister";


function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <Routes>
      <Route path="/" element={<UserHome/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/register" element={<UserRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;
