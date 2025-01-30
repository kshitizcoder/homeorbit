// import React, { useEffect, useState } from "react";
// import { useLoginMutation } from "../redux/Auth/authApi";
// import { useDispatch, useSelector } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { setCredentials } from "../redux/Auth/authSlice";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);
//   // console.log(userInfo);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userDetails = await login(formData).unwrap();
//     dispatch(setCredentials(userDetails.data.user));
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(error.data.message);
//       // console.log(error.data.message);
//     }
//     if (isSuccess) {
//       toast.success("Login Succcessfully");
//     }
//     if (userInfo) {
//       if (userInfo.role === "buyer") {
//         navigate("/buyer-dashboard");
//       } else if (userInfo.role === "admin") {
//         navigate("/dashboard");
//       } else if (userInfo.role === "seller") {
//         navigate("/seller-dashboard");
//       }
//     }
//   }, [userInfo, isError, isSuccess]);

//   console.log(error);
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center h-screen shadow-2xl justify-center"
//       >
//         {/* {error && <h4>{error.data.message}</h4>} */}
//         <div>
//           <label htmlFor="" className="block font-medium">
//             Email:
//           </label>
//           <input
//             type="email"
//             className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//             name="email"
//             onChange={handleChange}
//             placeholder="Email"
//           />
//         </div>
//         <div className="mt-4">
//           <label htmlFor="" className="block font-medium">
//             Password:
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//             onChange={handleChange}
//             placeholder="*******"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="bg-primary px-7 mt-5 py-1 rounded text-pure"
//             disabled={isLoading}
//           >
//             Log In
//           </button>
//         </div>
//         <div className="flex mt-5">
//           {" "}
//           <p>Create account </p>
//           <Link
//             className="ml-2 text-primary font-medium hover:underline"
//             to="/signup"
//           >
//             SignUp
//           </Link>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { useLoginMutation } from "../redux/Auth/authApi";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setCredentials } from "../redux/Auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = await login(formData).unwrap();
    dispatch(setCredentials(userDetails.data.user));
    localStorage.setItem("token", userDetails.token);
    console.log(
      "😁😁😁🎶🎶🎶",

      userDetails.data.user.name
    );
  };
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
      // console.log(error.data.message);
    }
    if (isSuccess) {
      toast.success("Login Succcessfully");
    }
    if (userInfo) {
      if (userInfo.role === "buyer") {
        navigate("/buyer-dashboard");
      } else if (userInfo.role === "admin") {
        navigate("/dashboard");
      } else if (userInfo.role === "seller") {
        navigate("/seller-dashboard");
      }
    }
  }, [userInfo, isError, isSuccess]);

  console.log(error);
  return (
    <>
      {/* <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center h-screen shadow-2xl justify-center"
      >
        <div>
          <label htmlFor="" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            className="w-[20rem] py-2 px-4 rounded focus:outline-none"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="block font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
            onChange={handleChange}
            placeholder="*****"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary px-7 mt-5 py-1 rounded text-pure"
            disabled={isLoading}
          >
            Log In
          </button>
        </div>
        <div className="flex mt-5">
          {" "}
          <p>Create account </p>
          <Link
            className="ml-2 text-primary font-medium hover:underline"
            to="/signup"
          >
            SignUp
          </Link>
        </div>
      </form> */}
      {/* <div className="flex justify-center items-center mt-14 ">
        <div className="flex justify-center items-center w-[30%] pb-4 bg-pure rounded-lg shadow-md shadow-ternary">
          <form onSubmit={handleSubmit}>
            <p className="font-bold text-2xl py-2 text-center">Login</p>
            <div className="mt-4">
              <label htmlFor="" className="block font-medium">
                Email:
              </label>
              <input
                type="email"
                className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary text-sm"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="block font-medium">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary mb-4 text-sm"
                onChange={handleChange}
                placeholder="*****"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-primary  w-full py-2 rounded text-pure text-center tracking-[.025em]"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
            <div className="flex mt-5 justify-center">
              {" "}
              <p className="text-sm">Don't have an account?</p>
              <Link
                className="ml-2 text-primary font-medium hover:underline text-sm"
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div> */}

      <div className="flex justify-center items-center mt-14">
        <div className="flex justify-center items-center w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] pb-4 bg-pure rounded-lg shadow-md shadow-ternary">
          <form onSubmit={handleSubmit} className="w-full px-4">
            <p className="font-bold text-2xl py-2 text-center">Login</p>
            <div className="mt-4">
              <label htmlFor="" className="block font-medium">
                Email:
              </label>
              <input
                type="email"
                className="w-full sm:w-[20rem] py-2 focus:outline-none border-b-[1px] border-ternary text-sm"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="block font-medium">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="w-full sm:w-[20rem] py-2 focus:outline-none border-b-[1px] border-ternary mb-4 text-sm"
                onChange={handleChange}
                placeholder="*****"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary w-full py-2 rounded text-pure text-center tracking-[.025em]"
                disabled={isLoading}
              >
                Login
              </button>
            </div>

            <div className="flex mt-5 justify-center">
              <p className="text-sm">Don't have an account?</p>
              <Link
                className="ml-2 text-primary font-medium hover:underline text-sm"
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
