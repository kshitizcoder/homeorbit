import React, { useEffect } from "react";
import { useGetUserProfileQuery } from "../redux/Auth/authApi";
import Profile from "../components/seller/Profile";
import SavedProperties from "../components/Property/SavedProperties";

import { useGetChatsQuery } from "../redux/chat/chatApi";

const BuyerDashboard = () => {
  const { data, error, refetch } = useGetUserProfileQuery();
  const { data: chatData, refetch: chatRefetch } = useGetChatsQuery();
  useEffect(() => {
    refetch();
    chatRefetch();
  }, [refetch, chatRefetch]);
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
