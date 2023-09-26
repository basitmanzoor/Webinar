import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/sign" />;
}

export default PrivateComponent;
