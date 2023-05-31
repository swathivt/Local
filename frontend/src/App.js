import "./App.css";
import axios from "axios";
import "./css/style.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout";
import { Signup } from "./pages/signup";
import { Contactus } from "./pages/contactus";
//import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        {/*   render app into Router component */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contactus" element={<Contactus />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
