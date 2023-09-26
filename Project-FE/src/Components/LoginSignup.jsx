import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../App.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [justifyActive, setJustifyActive] = useState("tab1");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    let decodedToken = {};
    // const [role, setRole] = useState("");
    if (auth) {
      decodedToken = jwt_decode(auth);
    }
    if (auth && decodedToken.role === "user") {
      toast("Login successful");
      navigate("/myhome");
    } else if (auth && decodedToken.role === "admin") {
      toast("Login successful");
      navigate("/");
    }
  });

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  //signup data collection
  async function collectData() {
    // console.log(name, email, password, passwordConfirmation);
    const result = await fetch("http://127.0.0.1:8090/api/v1/auth/signup/", {
      method: "POST",
      body: JSON.stringify({ name, email, password, passwordConfirmation }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    localStorage.setItem("user", JSON.stringify(data));
    toast("signup successful");
  }

  //login data collection
  async function login() {
    // console.log(email, password);
    const response = await fetch("http://127.0.0.1:8090/api/v1/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      const auth = localStorage.getItem("token");
      let decodedToken = {};
      // const [role, setRole] = useState("");
      if (auth) {
        decodedToken = jwt_decode(auth);
      }

      if (decodedToken.role === "user") {
        toast("Login successful");
        navigate("/myhome");
      }
      if (decodedToken.role === "admin") {
        toast("Login successful");
        navigate("/");
      }
    }
  }

  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50 loginForm">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Signup
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form7"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form8"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn className="mb-4 w-100" onClick={login}>
              Sign in
            </MDBBtn>
            <ToastContainer />
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="form1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="PasswordConfirmation"
              id="form4"
              type="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setpasswordConfirmation(e.target.value)}
            />
            <MDBBtn className="mb-4 w-100" onClick={collectData}>
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
}

export default Login;
