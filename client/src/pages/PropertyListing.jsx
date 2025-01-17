import React, { useEffect, useState } from "react";
import SearchBox from "../components/Property/SearchBox";
import { useGetAllPropertyQuery } from "../redux/property/propertyApi";
import { useLocation, useParams } from "react-router-dom";
import ListingItems from "../components/Property/ListingItems";
import PropertyMap from "../components/Map/PropertyMap";
import { Await } from "react-router-dom";
const PropertyListing = () => {
  const location = useLocation();
  const { urltype } = useParams();
  const [typeDefault, setTypeDefault] = useState("");

  const [city, setCity] = useState(location.state?.city || "butwal");
  const [minPrice, setMinPrice] = useState(location.state?.minPrice || 1000);
  const [maxPrice, setMaxPrice] = useState(
    location.state?.maxPrice || 40000000
  );
  const [type, setType] = useState(location.state?.type || typeDefault);
  useEffect(() => {
    if (urltype === "rent") {
      setType("rent");
    } else if (urltype === "sell") {
      setType("sell");
    }
  }, [urltype]);

  // );
  const { data, isError, error } = useGetAllPropertyQuery({
    city,
    minPrice,
    maxPrice,
    type,
  });
  console.log(data);
  console.log(error);

  return (
    <section className="px-10">
      <div>
        <SearchBox
          city={city}
          maxPrice={maxPrice}
          minPrice={minPrice}
          type={type}
          urlType={urltype}
          setCity={setCity}
          setType={setType}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div className="xl:flex gap mt-5 justify-between">
        <div className="lg:flex justify-between ">
          {data?.property?.length === 0 ? (
            <h4>No Properties Found</h4>
          ) : (
            <ListingItems property={data} />
          )}
        </div>
        <div className="lg:w-[35rem] mt-4 xl:mt-0 h-[90vh]">
          {data?.property?.length === 0 ? null : <PropertyMap items={data} />}
        </div>
      </div>
    </section>
  );
};
export default PropertyListing;
