// import React, { useEffect, useState } from "react";
// import { useUpdateMeMutation } from "../../redux/Auth/authApi";
// import { NavLink, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// const UpdateMe = () => {
//   const { id } = useParams();
//   console.log(id);
//   const [name, setName] = useState("");
//   const [photo, setPhoto] = useState(null);
//   // console.log(photo);
//   console.log(name);
//   console.log(photo);
//   const [updateProfile, { isError, error, isSuccess }] = useUpdateMeMutation();

//   // useEffect(() => {
//   //   if (!data) {
//   //     refetch(); // Only refetch if no data is present
//   //   }
//   // }, [data, refetch]);
//   if (isError) {
//     console.error("Update error:", error);
//   }
//   // console.log(updateData);
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (name) {
//       formData.append("name", name);
//     }
//     if (photo) {
//       formData.append("photo", photo);
//     }
//     console.log("FormData:", formData);
//     try {
//       await updateProfile({ id, formData }).unwrap();
//       // handle success, like showing a success message
//     } catch (error) {
//       // handle error
//       console.error("Failed to update user:", error.error);
//     }
//     console.log(formData);
//   };
//   return (
//     <section className="flex justify-center">
//       <div className=" w-[50%] mx-auto">
//         <form
//           method="PATCH"
//           enctype="multipart/form-data"
//           onSubmit={handleFormSubmit}
//         >
//           <div className="flex items-center gap-5">
//             <h4 className="text-secondary font-bold">Avatar:</h4>
//             <input
//               type="file"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   const file = e.target.files[0];
//                   setPhoto(file);
//                 }
//               }}
//             />
//           </div>
//           <div className="flex items-center gap-5 my-3">
//             <h4 className="text-secondary font-bold">Name:</h4>

//             <input
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               className="px-1 border-2 border-light"
//             />
//           </div>

//           <div className="flex gap-5">
//             <button
//               type="submit"
//               className="ml-4  bg-primary px-5 text-pure  py-1"
//             >
//               Update profile
//             </button>
//             <button className="ml-4  bg-secondary px-5 text-pure  py-1">
//               <NavLink to={"/buyer-dashboard"}>Back</NavLink>
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UpdateMe;

import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useUpdateMeMutation } from "../../redux/Auth/authApi";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const UpdateMe = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  const [updateProfile, { isError, error, isSuccess }] = useUpdateMeMutation();

  if (isError) {
    console.error("Update error:", error);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", name);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      // Call the RTK Query mutation
      await updateProfile({ id, formData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <section className="flex justify-center">
      <div className=" w-[50%] mx-auto">
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data" // Use multipart/form-data encoding
        >
          <div className="flex items-center gap-5">
            <h4 className="text-secondary font-bold">Avatar:</h4>
            <input
              type="file"
              onChange={(e) => {
                setPhoto(e.target.files[0]); // Set the file
              }}
            />
          </div>
          <div className="flex items-center gap-5 my-3">
            <h4 className="text-secondary font-bold">Name:</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-1 border-2 border-light"
            />
          </div>

          {/* <div className="flex gap-5"> */}
          <button type="submit" className="ml-4 bg-primary px-5 text-pure py-1">
            Update profile
          </button>
          {/* <button className="ml-4 bg-secondary px-5 text-pure py-1">
              <NavLink to={"/buyer-dashboard"}>Back</NavLink>
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default UpdateMe;
