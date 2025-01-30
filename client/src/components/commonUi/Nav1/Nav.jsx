import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutMutation } from "../../../redux/Auth/authApi";
import { logout } from "../../../redux/Auth/authSlice";

const Nav = () => {
  const [Mobile, setMobile] = useState(false);
  const [logoutUser, { isLoading }] = useLogOutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {}
  };
  return (
    <nav className="navbar  container py-5 px-8 mx-auto flex justify-between items-center">
      <div className="logo">
        <div className="font-bold">HomeOrbit</div>
      </div>
      <ul
        className={
          Mobile
            ? " py-5 absolute z-50 transition-all  ease-in-out flex flex-col items-center left-0 top-[7%] w-full bg-pure"
            : " hidden lg:flex  md:w-full text-md font-medium md:items-center gap-5 md:justify-end "
        }
        onClick={() => setMobile(false)}
      >
        {/* <Link to="/" className=" mt-9 md:mt-0 md:mr-9 ">
          <li>Home</li>
        </Link>
        <Link to="/about" className=" mt-9 md:mt-0 md:mr-9">
          <li>About</li>
        </Link>
        <Link to="/services" className="mt-9 md:mt-0 md:mr-9">
          <li>Projects</li>
        </Link>
        <Link to="/projects" className="mt-9 md:mt-0 md:mr-9">
          <li>Blog</li>
        </Link>
        <Link to="/contact" className="mt-9 md:mt-0 md:mr-9">
          <li>Conatct</li>
        </Link> */}
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
            to={"/property-listing/rent"}
          >
            Rent
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
            to={"/property-listing/sell"}
          >
            Sell
          </NavLink>
        </li>

        {userInfo ? (
          // <div
          //   className="bg-acent cursor-pointer text-pure px-7 py-1"
          //   onClick={handleLogout}
          // >
          //   {" "}
          //   logout{" "}
          // </div>

          <>
            <Link
              className="bg-primary px-5 py-1 text-pure rounded"
              to={`${
                userInfo.role === "buyer"
                  ? "/buyer-dashboard"
                  : userInfo.role === "seller"
                  ? "/buyer-dashboard"
                  : "dashboard"
              }`}
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to={"/signup"} className="">
                <button className="bg-primary text-pure px-7 py-1 rounded">
                  Signup
                </button>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <button className="mobile-menu-icon " onClick={() => setMobile(!Mobile)}>
        {Mobile ? (
          <ImCross className="lg:hidden" />
        ) : (
          <FaBars className="lg:hidden" />
        )}
      </button>
    </nav>
  );
};

export default Nav;
