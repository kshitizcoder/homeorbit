import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useLogOutMutation } from "../../redux/Auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";
const Navbar = () => {
  const [logoutUser, { isLoading }] = useLogOutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <nav className="bg-white border-gray-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="font-bold">HomeOrbit</div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
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
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to={"/compare-property"}
              >
                CompareProperty
              </NavLink>
            </li>
            {userInfo ? (
              <div
                className="bg-acent cursor-pointer text-pure px-7 py-1"
                onClick={handleLogout}
              >
                {" "}
                logout{" "}
              </div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
