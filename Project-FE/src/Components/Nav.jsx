import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

//Import role based components
import EndUser from "./Users/EndUser";
import Admin from "./Users/Admin";

import "../App.css";

function Nav() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  let decodedToken = {};
  // const [role, setRole] = useState("");
  if (auth) {
    decodedToken = jwt_decode(auth);
    localStorage.setItem("role", decodedToken.role);
  }
  // const decodedToken = jwt_decode(auth);
  // setRole(decodedToken.role);

  return (
    <div className="header">
      {auth ? (
        <Home auth={auth} navigate={navigate} role={decodedToken.role} />
      ) : (
        <Register />
      )}
    </div>
  );
}

function Home({ navigate, role }) {
  if (role === "admin") {
    return <Admin navigate={navigate} />;
  }
  if (role === "user") {
    return <EndUser navigate={navigate} />;
  }
}

function Register() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/sign">REGISTER</Link>
      </li>
    </ul>
  );
}
export default Nav;
