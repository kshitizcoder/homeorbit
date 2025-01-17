import React, { useState } from "react";
import { useLogOutMutation } from "../redux/Auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import UsersInfo from "../components/admin/user/UsersInfo";
import AdminHome from "../components/admin/AdminHome";
import SideBar from "../components/admin/SideBar";
import UserMain from "../components/admin/user/UserMain";
import AdminProperty from "../components/admin/property/AdminProperty";

const Dashboard = () => {
  const [isHome, setIsHome] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isProperty, setIsProperty] = useState(false);

  return (
    <section className="px-2 flex gap-10">
      <div>
        <SideBar home={setIsHome} user={setIsUser} property={setIsProperty} />
      </div>
      <div className="">
        {isUser && <UserMain />}
        {isProperty && <AdminProperty />}
        {isHome && <AdminHome />}
      </div>
    </section>
  );
};

export default Dashboard;
