import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//import components
import Nav from "./Components/Nav";
import LoginSignup from "./Components/LoginSignup";
import PrivateComponent from "./Components/PrivateComponent";
import CreateWebinar from "./Components/AdminComponents/CreateWebinar";
import PastWebinars from "./Components/AdminComponents/PastWebinars";
import OngoingWebinars from "./Components/AdminComponents/OngoingWebinars";
import UpcomingWebinars from "./Components/AdminComponents/UpcomingWebinars";
import AllWebinars from "./Components/AdminComponents/AllWebinars";
import UpcomingWebinarsUser from "./Components/UserComponents/UpcomingWebinarsUser";
import RegisteredWebinars from "./Components/UserComponents/RegisteredWebinars";
import AttendedWebinars from "./Components/UserComponents/AttendedWebinars";
import JoinWebinar from "./Components/UserComponents/JoinWebinar";
import GetRU from "./Components/AdminComponents/GetRU";
import NotFound from "./Components/Extras/Notfound";
import GoToReg from "./Components/Extras/GoToReg";
import GetRegUsers from "./Components/Extras/GetRegUsers";
import UserDetails from "./Components/AdminComponents/UserDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<AllWebinars />} />
            <Route path="/myhome" element={<UpcomingWebinarsUser />} />
            <Route path="/createWebinar" element={<CreateWebinar />} />
            <Route path="/pastwebinars" element={<PastWebinars />} />
            <Route path="/ongoingwebinars" element={<OngoingWebinars />} />
            <Route path="/upcomingWebinars" element={<UpcomingWebinars />} />
            <Route
              path="/registeredWebinars"
              element={<RegisteredWebinars />}
            />
            <Route path="/attendedWebinars" element={<AttendedWebinars />} />
            <Route path="/joinWebinar/:id" element={<JoinWebinar />} />
            <Route path="/joinWebinar" element={<GoToReg />} />
            <Route path="/getRegisteredUsers/:id" element={<GetRU />} />
            <Route path="/getRegisteredUsers" element={<GetRegUsers />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/logout" />
          </Route>
          <Route path="/sign" element={<LoginSignup />} />
          <Route path="/*" element={<NotFound />} />
          {/* login and signup */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
