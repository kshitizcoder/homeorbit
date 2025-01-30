import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default AdminLayout;
