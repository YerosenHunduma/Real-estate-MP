import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { user } = useSelector((state) => state.user);
  return <div>{user ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default ProtectedRoutes;
