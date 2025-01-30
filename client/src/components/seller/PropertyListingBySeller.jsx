import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { MdBedroomParent, MdBathroom } from "react-icons/md";
import HouseImg from "../../assets/house.jpg";
import { NavLink } from "react-router-dom";
import {
  useDeletePropertyMutation,
  useGetAllPropertyByUserQuery,
} from "../../redux/property/propertyApi";
import toast from "react-hot-toast";
const PropertyListingBySeller = () => {
  const {
    data: property,
    error: propertyError,
    refetch: refetchProperties,
  } = useGetAllPropertyByUserQuery();
  const [deleteProperty, { isLoading, isSuccess, isError, error }] =
    useDeletePropertyMutation();
  if (isError) {
  }
  const handleDeleteProperty = async (id) => {
    await deleteProperty(id).unwrap();
    if (isSuccess) {
      toast.success("Property Delete Successfully");
    }
  };
  useEffect(() => {
    refetchProperties();
  }, [refetchProperties]);

  return (
    <section>
      <div>
        {property?.property &&
          property?.property?.map((property) => {
            return (
              <div key={property?._id} className="lg:flex mt-5  gap-x-10 ">
                <div className="w-[30rem]">
                  {/* <img src={HouseImg} alt="property" className="" /> */}
                  <img
                    src={`https://homeorbit-backend.onrender.com/thumbnail/${property?.thumbnail}`}
                    alt=""
                  />
                </div>
                <div>
                  <h2>{property?.title}</h2>

                  <div className="flex mt-2 gap-x-4 items-center">
                    <IoLocation className="text-primary text-4xl" />
                    <p>{property?.city}</p>
                  </div>
                  <div className="flex mt-2 gap-x-4 items-center">
                    <div className="flex mt-2 gap-x-4 items-center">
                      <MdBedroomParent className="text-primary text-4xl" />
                      <h4>{property?.NumberOfBedRoom} Bed Room</h4>
                    </div>
                    <div className="flex mt-2 gap-x-4 items-center">
                      <MdBathroom className="text-primary text-4xl" />
                      <h4>{property?.NumberOfBathroom} Bath Room</h4>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button>
                      <NavLink
                        className="bg-primary text-pure px-5 rounded-sm py-1"
                        to={`/edit-property/${property?._id}`}
                      >
                        Edit
                      </NavLink>
                    </button>
                    {/* <button
                      disabled={isLoading}
                      onClick={() => handleDeleteProperty(property?._id)}
                      className="bg-acent ml-3 text-pure px-5 rounded-sm py-1"
                    >
                      {isLoading ? "Deleting..." : "Delete"}
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default PropertyListingBySeller;
