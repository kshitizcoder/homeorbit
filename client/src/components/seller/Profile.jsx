import React, { useEffect, useState } from "react";
import user from "../../assets/user.jpg";

import Modal from "react-modal";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/Auth/authSlice";
import { useLogOutMutation } from "../../redux/Auth/authApi";
import { useDispatch } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Profile = ({ UserInfo }) => {
  const [userData, setUserData] = useState(UserInfo);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [logoutUser, { isLoading }] = useLogOutMutation();
  useEffect(() => {
    setUserData(UserInfo);
  }, [UserInfo, userData]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        {/* <h4 className="text-secondary font-bold">Avatar:</h4> */}
        {/* <img src={user} alt="user" /> */}

        {/* <img
          src={`http://localhost:4500/public/users/${userData?.user?.photo}`}
          alt="user-photo"
        /> */}
        <img
          className="rounded-full w-[5rem]"
          src={
            userData?.user?.photo
              ? `https://homeorbit-backend.onrender.com/users/${userData?.user?.photo}`
              : user
          }
          alt="User Photo"
        />
      </div>
      <div className="flex items-center gap-5 my-3">
        <h4 className="text-secondary font-bold">Name:</h4>
        <p>{userData?.user?.name}</p>
      </div>
      <div className="flex items-center gap-5">
        <h4 className="text-secondary font-bold">Email:</h4>
        <p>{userData?.user?.email}</p>
      </div>{" "}
      <div className="mt-5 flex items-center gap-5">
        {userData?.user?.role === "seller" ? (
          <button className="bg-primary text-pure px-6 py-1">
            <NavLink to="/add-property">Add Property</NavLink>{" "}
          </button>
        ) : null}
        <button
          onClick={handleLogout}
          className="bg-acent text-pure px-5 py-1 "
        >
          LogOut
        </button>

        {/* <button className="ml-4  bg-secondary px-5 text-pure  py-1">
          <NavLink to={`/upadteMe/${UserInfo?.user?._id}`}>
            Update profile
          </NavLink>
        </button> */}
      </div>
    </div>
  );
};

export default Profile;
