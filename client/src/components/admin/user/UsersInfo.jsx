import React from "react";
import Table from "rc-table";
// import { useGetAllUserQuery } from "../../../redux/Auth/authApi";
const UsersInfo = () => {
  // const { data } = useGetAllUserQuery();
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "email",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    ,
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      render: () => <a href="#">Delete</a>,
    },
  ];
  // console.log(data);
  return (
    <section>
      <Table columns={columns} data={data} />
    </section>
  );
};

export default UsersInfo;
