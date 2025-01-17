import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../redux/Auth/authApi";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { logout } from "../redux/Auth/authSlice";

const UserHome = () => {
  return <>User home</>;
};

export default UserHome;
