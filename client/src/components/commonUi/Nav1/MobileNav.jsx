import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="bg">
      <div className="flex justify-between items-center px-7 ">
        <div>
          <h1 className="text-2xl">MblLogo..</h1>
        </div>
        {isOpen ? (
          <RxCross2 className="text-2xl" onClick={() => setIsOpen(false)} />
        ) : (
          <IoIosMenu
            onClick={() => {
              setIsOpen(true);
              console.log("clicked");
            }}
            className="text-2xl"
          />
        )}
      </div>
      <div
        // className={`${
        //   isOpen
        //     ? "absolute  right-[0%] top-[3rem] w-[15rem]  px-5"
        //     : " absolute right-[-100rem]"
        // }  flex justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] `}
        className={`absolute right-0 top-[3rem] w-[15rem] px-5 flex justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300 ease-in-out transform  ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0 py-5"
            : "max-h-0 opacity-0 -translate-y-full"
        } overflow-hidden bg-blue-700 rounded-tl-md  rounded-bl-md `}
      >
        <div className="flex flex-col gap-5 ">
          <ul className="flex flex-col gap-5 font-medium mr-10 text-white ">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
          <div>
            <button className="font-medium text-white">login</button>
          </div>

          <button className="text-blue-600 px-7 rounded font-medium bg-white py-1">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
