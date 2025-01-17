import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navgiate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== "buyer") {
      navgiate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default UserLayout;
