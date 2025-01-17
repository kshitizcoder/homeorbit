import React from "react";
import { useGetAllPropertyByAdminQuery } from "../../../redux/property/propertyApi";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const AdminProperty = () => {
  const { data, isError, error } = useGetAllPropertyByAdminQuery();

  return (
    <section className="w-full md:w-3/4 lg:w-3/5 mx-auto p-5">
      {isError ? (
        <div className="text-red-600 text-center font-semibold py-5">
          <p>Error loading properties: {error.message}</p>
        </div>
      ) : (
        <div className=" bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-primary text-pure">
                <th className="px-6 py-3 text-left font-semibold min-w-[40px]">
                  S.N
                </th>
                <th className="px-6 py-3 text-left font-semibold min-w-[150px]">
                  Title
                </th>
                <th className="px-6 py-3 text-left font-semibold min-w-[150px]">
                  Location
                </th>
                <th className="px-6 py-3 text-left font-semibold min-w-[100px]">
                  BedRoom
                </th>
                <th className="px-6 py-3 text-left font-semibold min-w-[100px]">
                  BathRoom
                </th>
                <th className="px-6 py-3 text-left font-semibold min-w-[100px]">
                  LivingRoom
                </th>
                {/* <th className="px-6 py-3 text-left font-semibold min-w-[120px]">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data?.property.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-lg text-gray-500"
                  >
                    No properties available
                  </td>
                </tr>
              ) : (
                data?.property?.map((pro, i) => {
                  const title = pro?.title?.substring(0, 15);
                  return (
                    <tr
                      key={pro?._id}
                      className="border-b hover:bg-light transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-center">{i + 1}</td>
                      <td className="px-6 py-4">{title}...</td>
                      <td className="px-6 py-4">{pro?.city}</td>
                      <td className="px-6 py-4">{pro?.NumberOfBedRoom}</td>
                      <td className="px-6 py-4">{pro?.NumberOfBathroom}</td>
                      <td className="px-6 py-4">{pro?.NumberOfLivingRoom}</td>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminProperty;

// import React from "react";
// import { useGetAllPropertyByAdminQuery } from "../../../redux/property/propertyApi";
// import { MdDeleteForever, MdEdit } from "react-icons/md";

// const AdminProperty = () => {
//   const { data, isError, error } = useGetAllPropertyByAdminQuery();
//   console.log(data);

//   console.log(error);
//   return (
//     <section className="">
//       <div className="flex flex-col  rounded-md  text-center gap-2">
//         <div className="md:grid grid-cols-7 border-b-2 text-primary  hidden">
//           <p>S.N</p>
//           <p>Title</p>
//           <p>Loaction</p>
//           <p>BedRoom</p>
//           <p>BathRoom</p>
//           <p>LivingRoom</p>
//           <p>Action</p>
//         </div>
//         {data?.property.length === 0 ? (
//           <p>No Users available</p>
//         ) : (
//           data?.property?.slice(0, 10).map((pro, i) => {
//             const title = pro?.title?.substring(0, 10);
//             return (
//               <div
//                 className="grid md:grid-cols-7 text-sm text-center bg-pure p-2 "
//                 key={pro?._id}
//               >
//                 <p>{i + 1}</p>
//                 <p className="text-xl">{title}...</p>
//                 <p className="text-xl">{pro?.city}</p>
//                 <p className="text-xl">{pro?.NumberOfBathroom}</p>
//                 <p className="text-xl">{pro?.NumberOfBedRoom}</p>
//                 <p className="text-xl">{pro?.NumberOfLivingRoom}</p>

//                 <p>
//                   <div className="flex flex-row justify-center text-xl gap-2">
//                     <button onClick={() => {}}>
//                       <MdEdit className="text-primary" />
//                     </button>
//                     <button onClick={() => {}}>
//                       <MdDeleteForever className="text-acent" />
//                     </button>
//                   </div>
//                 </p>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </section>
//   );
// };

// export default AdminProperty;
