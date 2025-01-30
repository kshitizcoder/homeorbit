import React from "react";
import { FaHome, FaUser, FaBuilding } from "react-icons/fa"; // Importing relevant icons
import { useLogOutMutation } from "../../redux/Auth/authApi";
import { logout } from "../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";

const SideBar = ({ home, property, user }) => {
  const [logoutUser] = useLogOutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {}
  };
  return (
    <section className="bg-primary h-screen px-8 py-6">
      <div>
        <h2 className="text-pure text-3xl text-center font-bold mb-8">
          Home Orbit
        </h2>
      </div>
      <div className="mt-10 flex flex-col gap-8">
        {/* Home Tab */}
        <h3
          onClick={() => {
            home(true);
            property(false);
            user(false);
          }}
          className="transition-all duration-300 ease-in-out text-2xl text-center cursor-pointer font-semibold text-secondary bg-pure px-6 py-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary flex items-center justify-center gap-3"
        >
          <FaHome /> {/* Home Icon */}
          Home
        </h3>
        {/* User Tab */}
        <h3
          onClick={() => {
            home(false);
            property(false);
            user(true);
          }}
          className="transition-all duration-300 ease-in-out text-2xl text-center cursor-pointer font-semibold text-secondary bg-pure px-6 py-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary flex items-center justify-center gap-3"
        >
          <FaUser /> {/* User Icon */}
          User
        </h3>
        {/* Property Tab */}
        <h3
          onClick={() => {
            home(false);
            property(true);
            user(false);
          }}
          className="transition-all duration-300 ease-in-out text-2xl text-center cursor-pointer font-semibold text-secondary bg-pure px-6 py-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary flex items-center justify-center gap-3"
        >
          <FaBuilding /> {/* Property Icon */}
          Property
        </h3>
        <button
          onClick={handleLogout}
          className="bg-acent text-pure px-5 py-1 "
        >
          LogOut
        </button>
      </div>
    </section>
  );
};

export default SideBar;

// import React from "react";

// const SideBar = ({ home, property, user }) => {
//   return (
//     <section className="bg-primary   h-screen px-5">
//       <div>
//         <h2 className="text-pure text-2xl text-center">Home Orbit</h2>
//       </div>
//       <div className=" mt-10 flex flex-col gap-7">
//         <h3
//           onClick={() => {
//             home(true);
//             property(false);
//             user(false);
//           }}
//           className=" text-2xl text-center cursor-pointer font-semibold text-secondary bg-pure px-5 py-1"
//         >
//           {" "}
//           Home
//         </h3>
//         <h3
//           onClick={() => {
//             home(false);
//             property(false);
//             user(true);
//           }}
//           className=" text-2xl text-center cursor-pointer font-semibold text-secondary bg-pure px-5 py-1"
//         >
//           {" "}
//           User
//         </h3>{" "}
//         <h3
//           onClick={() => {
//             home(false);
//             property(true);
//             user(false);
//           }}
//           className=" text-2xl  cursor-pointer text-center font-semibold text-secondary bg-pure px-5 py-1"
//         >
//           {" "}
//           Property
//         </h3>{" "}
//       </div>
//     </section>
//   );
// };

// export default SideBar;
