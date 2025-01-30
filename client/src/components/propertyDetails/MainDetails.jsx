import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import {
  MdBedroomParent,
  MdBathroom,
  MdOutlinePriceCheck,
} from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { useSavedPropertyMutation } from "../../redux/property/propertyApi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const MainDetails = ({ property }) => {
  const [
    savedProperty,
    {
      isError: propertyIsError,
      error: propertyError,
      isSuccess: propertyIsSuccess,
    },
  ] = useSavedPropertyMutation();

  const handleSavedProperty = async () => {
    await savedProperty(property?.property?._id).unwrap();
  };
  if (propertyIsError) {
    toast.error(propertyError.data.message);
  }
  if (propertyIsSuccess) {
    toast.success("Property Saved");
  }
  const navigate = useNavigate();

  return (
    <section className="flex justify-between">
      <div className="lg:flex mt-5 gap-x-10 lg:w-[90%]">
        <div className="md:w-[30rem]">
          <img
            src={
              property?.property?.thumbnail
                ? `https://homeorbit-backend.onrender.com/thumbnail/${property?.property?.thumbnail}`
                : "default-image-path.jpg" // fallback image
            }
            alt="property"
            className=""
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">
            {property?.property?.title}
          </h2>
          <div>
            <p>{property?.property?.description}</p>
          </div>
          <div className="flex mt-2 gap-x-4 items-center">
            <IoLocation className="text-primary text-4xl" />
            <p>{property?.property?.city}</p>
          </div>
          <div className="flex mt-2 gap-x-4 items-center">
            <div className="flex mt-2 gap-x-4 items-center">
              <MdBedroomParent className="text-primary text-4xl" />
              <h4>{property?.property?.NumberOfBedRoom} Bed Room</h4>
            </div>
            <div className="flex mt-2 gap-x-4 items-center">
              <MdBathroom className="text-primary text-4xl" />
              <h4>{property?.property?.NumberOfBathroom} Bath Room</h4>
            </div>
          </div>
          <div className="flex mt-2 gap-x-4 items-center">
            <MdOutlinePriceCheck className="bg-primary text-4xl rounded text-pure" />
            <h4>{property?.property?.price}</h4>
          </div>
          <div className="flex mt-2 gap-x-4 items-center">
            <h4 className="capitalize">
              Type Of Property:{" "}
              <span className="font-bold text-primary">
                {property?.property?.typeOfProperty}
              </span>
            </h4>
          </div>
          <div className="my-4 flex items-center gap-7">
            {/* <button className="text-pure bg-primary px-4 text-xl py-1 rounded-sm">
              Buy Property{" "}
            </button> */}

            <CiBookmark
              className="text-4xl text-secondary"
              onClick={handleSavedProperty}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDetails;
