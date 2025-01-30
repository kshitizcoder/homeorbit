// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSignupMutation } from "../../redux/Auth/authApi";
// import { Link, useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// const SellerSignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     role: "seller",
//   });
//   const navigate = useNavigate();
//   const [signup, { isLoading, error, data, isError }] = useSignupMutation();
//   console.log(error);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   console.log(error);
//   useEffect(() => {
//     if (isError) {
//       toast.error(error?.data?.message);
//     }
//   }, [isError]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await signup(formData).unwrap();

//       toast.success("successfully signup");
//       navigate("/login");
//     } catch (err) {
//       console.error("Failed to sign up: ", err);
//     }
//   };

//   return (
//     <section>
//       <div className=" flex justify-center h-screen items-center flex-col">
//         <h2 className="bg-primary text-pure px-5 rounded mb-5">
//           SigUp As Seller Or Renter
//         </h2>
//         <form action="" onSubmit={handleSubmit}>
//           <div>
//             <label className="block font-bold" name="name" htmlFor="">
//               Name:
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter Name..."
//               className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mt-5">
//             <label className="block font-bold" htmlFor="">
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//               placeholder="Enter Email..."
//               onChange={handleChange}
//               autoCorrect="false"
//             />
//           </div>{" "}
//           <div className="my-5">
//             <label className="block font-medium" htmlFor="">
//               Password:
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//               placeholder="Enter password..."
//               onChange={handleChange}
//             />
//           </div>
//           <div className="">
//             <label className="block font-medium" htmlFor="">
//               Password Confrim:
//             </label>
//             <input
//               type="password"
//               name="passwordConfirm"
//               placeholder="Enter Password Confrim..."
//               className="w-[20rem] bg-slate-200 py-2 px-4 rounded focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="text-center mt-5">
//             <button
//               disabled={isLoading}
//               type="submit"
//               className="bg-primary px-7 font-medium text-pure py-1 rounded"
//             >
//               SignUp
//             </button>
//           </div>
//           <div className="flex">
//             {" "}
//             <p>Have a account </p>
//             <Link
//               className="ml-2 text-blue-500 font-medium hover:underline"
//               to="/login"
//             >
//               login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default SellerSignUp;
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSignupMutation } from "../../redux/Auth/authApi";
// import { Link, useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// const SellerSignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     role: "seller",
//   });
//   const navigate = useNavigate();
//   const [signup, { isLoading, error, data, isError }] = useSignupMutation();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   console.log(error);
//   useEffect(() => {
//     if (isError) {
//       toast.error(error?.data?.message);
//     }
//   }, [isError]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await signup(formData).unwrap();

//       toast.success("successfully signup");
//       navigate("/login");
//     } catch (err) {
//       console.error("Failed to sign up: ", err);
//     }
//   };

//   return (
//     <section>
//       <div className="flex justify-center py-4 mt-4 flex-col items-center bg-pure rounded-lg shadow-md shadow-ternary">
//         <h2 className=" text-secondary mb-5 text-xl font-bold">
//           SignUp As Seller Or Renter
//         </h2>
//         <form action="" onSubmit={handleSubmit}>
//           <div className="px-6">
//             <label className="block font-medium" name="name" htmlFor="">
//               Name:
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary text-sm"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mt-5 px-6">
//             <label className="block font-medium" htmlFor="">
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary text-sm"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               autoCorrect="false"
//             />
//           </div>{" "}
//           <div className="my-5 px-6">
//             <label className="block font-medium" htmlFor="">
//               Password:
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary text-sm"
//               placeholder="Enter your password"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="px-6">
//             <label className="block font-medium" htmlFor="">
//               Confirm password:
//             </label>
//             <input
//               type="password"
//               name="passwordConfirm"
//               placeholder="Confirm your password"
//               className="w-[20rem] py-2  focus:outline-none border-b-[1px] border-ternary text-sm"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="text-center mt-5 px-6">
//             <button
//               disabled={isLoading}
//               type="submit"
//               className="bg-primary font-medium text-pure py-1 rounded w-full tracking-[.025em]"
//             >
//               SignUp
//             </button>
//           </div>
//           <div className="flex justify-center mt-2">
//             {" "}
//             <p className="text-sm">Already have an account?</p>
//             <Link
//               className="ml-2 text-primary font-medium hover:underline text-sm"
//               to="/login"
//             >
//               Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default SellerSignUp;
import React, { useEffect, useState } from "react";
import { useSignupMutation } from "../../redux/Auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "seller",
  });
  const navigate = useNavigate();
  const [signup, { isLoading, error, isError }] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData).unwrap();
      toast.success("Successfully signed up");
      navigate("/login");
    } catch (err) {
      console.error("Failed to sign up: ", err);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-secondary mb-5 text-xl font-bold text-center">
          Sign Up As Seller Or Renter
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Name",
              type: "text",
              name: "name",
              placeholder: "Enter your name",
            },
            {
              label: "Email",
              type: "email",
              name: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "Enter your password",
            },
            {
              label: "Confirm Password",
              type: "password",
              name: "passwordConfirm",
              placeholder: "Confirm your password",
            },
          ].map(({ label, type, name, placeholder }) => (
            <div key={name} className="mb-4">
              <label className="block font-medium">{label}:</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full py-2 border-b border-gray-300 focus:outline-none text-sm"
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-primary text-pure font-medium py-2 rounded mt-4 disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-3">
          Already have an account?
          <Link
            className="text-primary font-medium hover:underline ml-1"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SellerSignUp;
