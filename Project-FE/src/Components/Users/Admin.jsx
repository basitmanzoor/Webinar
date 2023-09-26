import { Link } from "react-router-dom";

function Admin({ navigate }) {
  function logout() {
    localStorage.clear();
    navigate("/sign");
  }
  return (
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
  );
}

export default Admin;
