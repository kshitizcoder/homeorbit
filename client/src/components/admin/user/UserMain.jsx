import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useGetAllUserQuery } from "../../../redux/Auth/authApi";

const UserMain = () => {
  const { data } = useGetAllUserQuery();
  console.log(data);

  return (
    <section className="w-full md:w-3/4 lg:w-3/5 mx-auto p-5">
      <div className=" bg-white rounded-lg shadow-lg">
        <table className=" text-sm">
          <thead>
            <tr className="bg-primary text-pure">
              <th className="px-6 py-3 text-left font-semibold min-w-[40px]">
                S.N
              </th>
              <th className="px-6 py-3 text-left font-semibold min-w-[150px]">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold min-w-[200px]">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold min-w-[100px]">
                Role
              </th>

              {/* <th className="px-6 py-3 text-left font-semibold min-w-[100px]">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.user.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-lg text-gray-500"
                >
                  No Users available
                </td>
              </tr>
            ) : (
              data?.user?.slice(0, 10).map((user, i) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-light transition-all duration-200"
                >
                  <td className="px-6 py-4 text-center">{i + 1}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>

                  <td className="px-6 py-4 text-center">
                    {/* <div className="flex justify-center items-center gap-4">
                      <button onClick={() => {}}>
                        <MdEdit className="text-primary text-xl hover:text-secondary transition-all" />
                      </button>
                      <button onClick={() => {}}>
                        <MdDeleteForever className="text-accent text-xl hover:text-red-600 transition-all" />
                      </button>
                    </div> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserMain;

// import React from "react";
// import { MdDeleteForever, MdEdit } from "react-icons/md";
// import { useGetAllUserQuery } from "../../../redux/Auth/authApi";

// const UserMain = () => {
//   const { data } = useGetAllUserQuery();
//   console.log(data);
//   return (
//     <section className="w-[50]">
//       <div className="flex flex-col  rounded-md  text-center gap-2">
//         <div className="md:grid grid-cols-5 border-b-2 text-primary  hidden">
//           <p>S.N</p>
//           <p>Name</p>
//           <p>Email</p>
//           <p>Role</p>
//           <p>Action</p>
//         </div>
//         {data?.user.length === 0 ? (
//           <p>No Users available</p>
//         ) : (
//           data?.user?.slice(0, 10).map((user, i) => (
//             <div
//               className="grid md:grid-cols-5 grid-cols-2 text-sm bg-pure p-2 "
//               key={user._id}
//             >
//               <p>{i + 1}</p>
//               <p className="text-xl">{user.name}</p>

//               <p className="text-xl">{user.email}</p>
//               <p className="text-xl">{user.role}</p>
//               <p>
//                 <div className="flex flex-row justify-center text-xl gap-2">
//                   <button onClick={() => {}}>
//                     <MdEdit className="text-primary" />
//                   </button>
//                   <button onClick={() => {}}>
//                     <MdDeleteForever className="text-acent" />
//                   </button>
//                 </div>
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default UserMain;
