import React, { useEffect } from "react";
import { useGetSavedPropertyQuery } from "../../redux/property/propertyApi";
import { IoLocation } from "react-icons/io5";
import { MdBedroomParent, MdBathroom } from "react-icons/md";
import { NavLink } from "react-router-dom";
const SavedProperties = () => {
  const { data, refetch } = useGetSavedPropertyQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <section className="h-auto">
      <div>
        {data?.properties?.length < 1 ? (
          <h2 className="my-2 font-bold bg-primary text-pure text-center  px-5 py-1">
            No Saved Properties Found{" "}
          </h2>
        ) : (
          <h2 className="my-2 font-bold bg-primary text-pure text-center  px-5 py-1">
            Saved Properties
          </h2>
        )}
      </div>
      <div>
        {data?.properties &&
          data?.properties?.map((property) => {
            return (
              <div key={property?._id} className="lg:flex mt-5  gap-x-10 ">
                <div className="md:w-[40%]">
                  {/* <img src={HouseImg} alt="property" className="" /> */}
                  <img
                    className=""
                    src={`https://homeorbit-backend.onrender.com/thumbnail/${property?.thumbnail}`}
                    alt="thumnail"
                  />
                </div>
                <div>
                  <h2>{property?.title}</h2>

                  <div className="flex mt-2 gap-x-4 items-center">
                    <IoLocation className="text-primary text-4xl" />
                    <p>{property.city}</p>
                  </div>
                  <div className="flex mt-2 gap-x-4 items-center">
                    <div className="flex mt-2 gap-x-4 items-center">
                      <MdBedroomParent className="text-primary text-4xl" />
                      <h4>{property.NumberOfBedRoom} Bed Room</h4>
                    </div>
                    <div className="flex mt-2 gap-x-4 items-center">
                      <MdBathroom className="text-primary text-4xl" />
                      <h4>{property.NumberOfBathroom} Bath Room</h4>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button>
                      <NavLink
                        target="_blank"
                        className="bg-primary text-pure px-5 rounded-sm py-1"
                        to={`/details/${property?._id}`}
                      >
                        See Details
                      </NavLink>
                    </button>
                    {/* <button
                    onClick={() => handleDeleteProperty(property?._id)}
                    className="bg-acent ml-3 text-pure px-5 rounded-sm py-1"
                  >
                    Delete
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

export default SavedProperties;
