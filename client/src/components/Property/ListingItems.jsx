import React from "react";
import { IoLocation } from "react-icons/io5";
import { MdBedroomParent, MdBathroom } from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
const ListingItems = ({ property }) => {
  return (
    <div>
      {property &&
        property?.property?.map((property) => {
          return (
            <div key={property?._id} className="lg:flex mt-5  gap-x-10 ">
              <div className="md:w-[30rem]">
                {/* <img src={HouseImg} alt="property" className="" />
                 */}
                <img
                  src={`https://homeorbit-backend.onrender.com/thumbnail/${property?.thumbnail}`}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{property?.title}</h2>

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
                <div className="mt-5 ">
                  <button>
                    <NavLink
                      target="_blank"
                      className="bg-primary text-pure px-5 rounded-sm py-1"
                      to={`/details/${property?._id}`}
                    >
                      See Details
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ListingItems;
