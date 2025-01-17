import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../redux/Auth/authSlice";
const SellerLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navgiate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo || userInfo.role !== "seller") {
      navgiate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default SellerLayout;
