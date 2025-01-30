import React from "react";
import { useParams } from "react-router-dom";
import { useGetPropertyQuery } from "../redux/property/propertyApi";
import MainDetails from "../components/propertyDetails/MainDetails";
import PropertyImages from "../components/propertyDetails/PropertyImages";
import PropertyMap from "../components/Map/PropertyMap";
import PropertyMapDetails from "../components/Map/PropertyMapDetails";

const PropertyDetails = () => {
  const { id } = useParams();
  const { data, isError } = useGetPropertyQuery(id);

  return (
    <section className=" px-10  w-[100%] ">
      <div className="w-full  ">
        <div>
          <MainDetails property={data} />
        </div>
        <div className="mt-5 w-[]">
          <h3 className="md:w-[30%] py-2  text-center text-pure bg-primary mx-auto ">
            Property Imgaes
          </h3>
          {/* <img src=`` alt="" /> */}
          <PropertyImages images={data?.property?.images} />
        </div>
      </div>
      <div className="mt-5"></div>
    </section>
  );
};

export default PropertyDetails;
