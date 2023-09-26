import { Link } from "react-router-dom";

function EndUser({ navigate }) {
  function logout() {
    localStorage.clear();
    navigate("/sign");
  }
  return (
    <ul className="navbar">
      <li>
        <Link to="/myhome">User Home</Link>
      </li>
      <li>
        <Link to="/registeredWebinars">REGISTERED WEBINARS</Link>
      </li>
      <li>
        <Link to="/attendedWebinars">ATTENDED WEBINARS</Link>
      </li>
      <li>
        <Link to="/joinWebinar">JOIN WEBINAR</Link>
      </li>
      <li>
        <Link onClick={logout} to="/sign">
          LOGOUT
        </Link>
      </li>
    </ul>
  );
}

export default EndUser;
