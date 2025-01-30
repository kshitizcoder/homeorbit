import React from "react";
import { useGetUserStatsQuery } from "../../redux/Auth/authApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const AdminHome = () => {
  const { data } = useGetUserStatsQuery();

  const userData = {
    labels: ["Admin", "Seller", "Buyer"],
    datasets: [
      {
        label: "Users by Role",
        data: [
          data?.userData?.admins,
          data?.userData?.sellers,
          data?.userData?.buyers,
        ],
        backgroundColor: "#6246ea",
        borderColor: "#5235e3c3",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const userOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Users by Role",
      },
    },
  };

  return (
    <section>
      <div>
        <div className="h-full md:w-[700px]">
          <h3 className="font-bold text-blue">Users by Role</h3>
          <div className="flex text-xs gap-2 justify-around text-secondary">
            <span className="flex text-xl">
              Total Users:
              <p>
                {data?.userData?.admins +
                  data?.userData?.sellers +
                  data?.userData?.buyers}
              </p>
            </span>
            <span className="flex text-xl">
              Admin:<p>{data?.userData?.admins}</p>
            </span>
            <span className="flex text-xl">
              Seller:<p>{data?.userData?.sellers}</p>
            </span>
            <span className="flex text-xl">
              User:<p>{data?.userData?.buyers}</p>
            </span>
          </div>
          <Line data={userData} options={userOptions} />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default AdminHome;
