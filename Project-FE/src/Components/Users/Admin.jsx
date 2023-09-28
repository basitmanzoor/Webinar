import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin({ navigate }) {
  function logout() {
    toast("logout completed");
    localStorage.clear();
    navigate("/sign");
  }
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to="/">DASHBOARD</Link>
        </li>
        <li>
          <Link to="/getRegisteredUsers">GET REG USERS</Link>
        </li>
        <li>
          <Link to="/createWebinar">CREATE WEBINAR</Link>
        </li>
        <li>
          <Link to="/pastWebinars">PAST WEBINARS</Link>
        </li>
        <li>
          <Link to="/ongoingWebinars">ONGOING WEBINARS</Link>
        </li>
        <li>
          <Link to="/upcomingWebinars">UPCOMING WEBINARS</Link>
        </li>
        <li>
          <Link to="/userdetails">👷‍♂️🛠</Link>
        </li>
        <li>
          <Link onClick={logout} to="/sign">
            LOGOUT
          </Link>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
}

export default Admin;
