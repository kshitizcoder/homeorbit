import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../redux/Auth/authApi";
import Profile from "../components/seller/Profile";
import PropertyListingBySeller from "../components/seller/PropertyListingBySeller";
import { useGetAllPropertyByUserQuery } from "../redux/property/propertyApi";

const SellerDashboard = () => {
  const { data, error, refetch } = useGetUserProfileQuery();

  const {
    data: propertyData,
    error: propertyError,
    refetch: refetchProperties,
  } = useGetAllPropertyByUserQuery();
  useEffect(() => {
    refetch();
    refetchProperties();
  }, [refetch, refetchProperties]);

  return (
    <section className="px-10 mt-8">
      <div className="lg:flex justify-between">
        <div>
          <Profile UserInfo={data} />
          <div>
            {propertyData?.property.length < 1 ? (
              <h2 className="my-2 font-bold">
                No Properties Found OF{" "}
                <span className="text-primary capitalize">
                  {" "}
                  {data?.user?.name}
                </span>{" "}
              </h2>
            ) : (
              <h2 className="my-2 font-bold">
                Properties Of{" "}
                <span className="text-primary capitalize">
                  {" "}
                  {data?.user?.name}
                </span>{" "}
              </h2>
            )}
          </div>
          <PropertyListingBySeller property={propertyData} />
        </div>
        <div className="mt-10 "></div>
      </div>
    </section>
  );
};

export default SellerDashboard;
