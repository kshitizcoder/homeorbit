import React, { useEffect } from "react";
import { useGetUserProfileQuery } from "../redux/Auth/authApi";
import Profile from "../components/seller/Profile";
import SavedProperties from "../components/Property/SavedProperties";

const BuyerDashboard = () => {
  const { data, error, refetch } = useGetUserProfileQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <section className="px-7 h-[100vh] flex justify-between">
      <div>
        <div>
          <Profile UserInfo={data} />
        </div>
        <div>
          <SavedProperties />
        </div>
      </div>{" "}
      <div></div>
    </section>
  );
};

export default BuyerDashboard;
