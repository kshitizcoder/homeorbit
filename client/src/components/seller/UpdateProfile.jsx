import React, { useEffect, useState } from "react";
import {
  useGetUserProfileQuery,
  // useUpdateMeMutation,
} from "../../redux/Auth/authApi";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  console.log(photo);

  // const [
  //   updateMe,
  //   { data: updateData, error: updateError, isError, isSuccess },
  // ] = useUpdateMeMutation();

  useEffect(() => {
    if (!data) {
      refetch(); // Only refetch if no data is present
    }
  }, [data, refetch]);
  if (isError) {
    toast.error(updateError?.error);
  }
  console.log(updateData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (photo) {
      formData.append("photo", photo);
    }
  };
  return (
    <section className="flex justify-center">
      <div className=" w-[50%] mx-auto">
        <form
          method="PATCH"
          enctype="multipart/form-data"
          onSubmit={handleFormSubmit}
        >
          <div className="flex items-center gap-5">
            <h4 className="text-secondary font-bold">Avatar:</h4>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setPhoto(file);
                }
              }}
            />
          </div>
          <div className="flex items-center gap-5 my-3">
            <h4 className="text-secondary font-bold">Name:</h4>

            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="px-1 border-2 border-light"
            />
          </div>

          <button
            type="submit"
            className="ml-4  bg-primary px-5 text-pure  py-1"
          >
            Update profile
          </button>
          {/* <button className="ml-4  bg-secondary px-5 text-pure  py-1">
              <NavLink to={"/buyer-dashboard"}>Back</NavLink>
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
