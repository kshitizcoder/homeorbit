import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PublicLayouts = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/dashboard");
      } else if (userInfo.role === "buyer") {
        navigate("/buyer-dashboard");
      } else if (userInfo.role === "seller") {
        navigate("/seller-dashboard");
      }
    }
  }, [userInfo]);
  return <Outlet />;
};

export default PublicLayouts;
