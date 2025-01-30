import React, { useState } from "react";
import { useUpdatePropertyMutation } from "../../redux/property/propertyApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProperty = () => {
  const { id } = useParams();
  const [updateProperty, { isError, isLoading, isSuccess, error }] =
    useUpdatePropertyMutation();

  const [title, setTitle] = useState("");
  const [NumberOfBathroom, setNumberOfBathroom] = useState(0);
  const [NumberOfBedRoom, setNumberOfBedRoom] = useState(0);
  const [NumberOfLivingRoom, setNumberOfLivingRoom] = useState(0);
  const [description, setDescription] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("rent");
  const [price, setPrice] = useState(0);
  const [propertyArea, setPropertyArea] = useState(0);
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 6) {
      setImages(files);
    } else {
      toast.error("Property must have less than 7 images");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("title", title);
    formData.append("city", city);
    formData.append("NumberOfBathroom", NumberOfBathroom);
    formData.append("NumberOfBedRoom", NumberOfBedRoom);
    formData.append("NumberOfLivingRoom", NumberOfLivingRoom);
    formData.append("description", description);
    formData.append("typeOfProperty", typeOfProperty);
    formData.append("price", price);
    formData.append("propertyArea", propertyArea);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      navigate("/seller-dashboard");
    }

    await updateProperty({ id, formData }).unwrap();
  };

  return (
    <section className="py-5">
      <div className="max-w-screen-lg mx-auto px-4">
        <form
          method="PATCH"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-center bg-primary w-[60%] mx-auto py-3 rounded-md text-pure px-5 text-xl font-semibold">
            Edit Property
          </h2>

          <div className="my-4">
            <label className="block text-lg font-semibold">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full md:w-[40rem] lg:w-[45rem] border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4">
            <div>
              <label className="block text-lg font-semibold">
                Number of Bathrooms:
              </label>
              <input
                onChange={(e) => setNumberOfBathroom(e.target.value)}
                name="NumberOfBathroom"
                type="number"
                min={0}
                placeholder="Bathrooms"
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Number of Bedrooms:
              </label>
              <input
                type="number"
                onChange={(e) => setNumberOfBedRoom(e.target.value)}
                name="NumberOfBedRoom"
                placeholder="Bedrooms"
                min={0}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Number of Living Rooms:
              </label>
              <input
                type="number"
                onChange={(e) => setNumberOfLivingRoom(e.target.value)}
                name="NumberOfLivingRoom"
                placeholder="Living Rooms"
                min={0}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="my-4">
            <label className="block text-lg font-semibold">Description:</label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4">
            <div>
              <label className="block text-lg font-semibold">City:</label>
              <input
                name="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Type of Property:
              </label>
              <select
                name="typeOfProperty"
                onChange={(e) => setTypeOfProperty(e.target.value)}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4">
            <div>
              <label className="block text-lg font-semibold">
                Property Area (in sq ft):
              </label>
              <input
                type="number"
                min={1}
                name="propertyArea"
                onChange={(e) => setPropertyArea(e.target.value)}
                placeholder="Property Area"
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Price:</label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                min={0}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4">
            <div>
              <label className="block text-lg font-semibold">Latitude:</label>
              <input
                type="text"
                name="latitude"
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Longitude:</label>
              <input
                type="text"
                placeholder="Longitude"
                name="longitude"
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="my-5 flex gap-5">
            <div>
              <label className="block text-lg font-semibold">
                Upload Property Images:
              </label>
              <input
                type="file"
                multiple
                onChange={handleImagesChange}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Upload Thumbnail:
              </label>
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full border-2 border-light py-2 px-3 mt-2 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary py-3 text-xl font-medium text-pure rounded-md mt-6"
          >
            Update Property
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProperty;

// import React, { useState } from "react";
// import {
//   useAddPropertyMutation,
//   useUpdatePropertyMutation,
// } from "../../redux/property/propertyApi";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// // import { useUpdateMeMutation } from "../../redux/Auth/authApi";

// const UpdateProperty = () => {
//   const { id } = useParams();
//   const [upadteProperty, { isError, isLoading, isSuccess, error }] =
//     useUpdatePropertyMutation();

//   const [title, setTitle] = useState("");
//   const [NumberOfBathroom, setNumberOfBathroom] = useState(0);
//   const [NumberOfBedRoom, setNumberOfBedRoom] = useState(0);
//   const [NumberOfLivingRoom, setNumberOfLivingRoom] = useState(0);
//   const [description, setDescription] = useState("");
//   const [typeOfProperty, setTypeOfProperty] = useState("rent");
//   const [price, setPrice] = useState(0);
//   const [propertyArea, setPropertyArea] = useState(0);
//   const [images, setImages] = useState([]);
//   const [city, setCity] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   const naviagte = useNavigate();

//   const handleImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length <= 6) {
//       setImages(files);
//     } else {
//       toast.error("Property must less than 7");
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (thumbnail) {
//       formData.append("thumbnail", thumbnail);
//     }
//     images.forEach((image) => {
//       formData.append("images", image);
//     });
//     if (isError) {
//       toast.error(error?.data?.message);
//     }
//     if (isSuccess) {
//       naviagte("/seller-dashboard");
//     }
//     if (title) {
//       formData.append("title", title);
//     }
//     if (city) {
//       formData.append("city", city);
//     }
//     if (NumberOfBathroom) {
//       formData.append("NumberOfBathroom", NumberOfBathroom);
//     }
//     if (NumberOfBedRoom) {
//       formData.append("NumberOfBedRoom", NumberOfBedRoom);
//     }
//     if (NumberOfLivingRoom) {
//       formData.append("NumberOfLivingRoom", NumberOfLivingRoom);
//     }
//     if (description) {
//       formData.append("description", description);
//     }
//     if (typeOfProperty) {
//       formData.append("typeOfProperty", typeOfProperty);
//     }
//     if (price) {
//       formData.append("price", price);
//     }
//     if (propertyArea) {
//       formData.append("propertyArea", propertyArea);
//     }
//     if (latitude) {
//       formData.append("latitude", latitude);
//     }
//     if (longitude) {
//       formData.append("longitude", longitude);
//     }

//     await upadteProperty({ id, formData }).unwrap();
//   };
//   // console.log(
//   //   title,
//   //   NumberOfBathroom,
//   //   NumberOfBedRoom,
//   //   NumberOfLivingRoom,
//   //   description,
//   //   typeOfProperty,
//   //   price,
//   //   propertyArea,
//   //   images,
//   //   thumbnail,
//   //   city
//   // );
//   return (
//     <section className=" py-5">
//       <div className="w-[80%] mx-auto">
//         <form
//           method="PATCH"
//           enctype="multipart/form-data"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-center bg-primary w-[50%] mx-auto py-2 rounded-sm text-pure px-5 ">
//             Edit Property
//           </h2>
//           <div>
//             <label htmlFor="" className="font-bold">
//               Title:
//             </label>
//             <input
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//               placeholder="Title"
//               className="border-2 block border-light md:w-[30rem] lg:w-[37rem]
//                focus:outline-none"
//               name="title"
//             />
//           </div>
//           <div className="flex gap-5 my-3">
//             <div>
//               <label htmlFor="" className="font-bold">
//                 NumberOfBathroom:
//               </label>
//               <input
//                 onChange={(e) => setNumberOfBathroom(e.target.value)}
//                 name="NumberOfBathroom"
//                 type="number"
//                 placeholder="Bathroom"
//                 min={0}
//                 className="border-2 block border-light focus:outline-none "
//               />
//             </div>
//             <div>
//               <label htmlFor="" className="font-bold">
//                 NumberOfBedRoom:
//               </label>
//               <input
//                 type="number"
//                 onChange={(e) => setNumberOfBedRoom(e.target.value)}
//                 name="NumberOfBedRoom"
//                 placeholder="BedRoom"
//                 min={0}
//                 className="border-2 block border-light focus:outline-none "
//               />
//             </div>
//             <div>
//               <label htmlFor="" className="font-bold">
//                 NumberOfLivingRoom:
//               </label>
//               <input
//                 type="number"
//                 onChange={(e) => setNumberOfLivingRoom(e.target.value)}
//                 name="NumberOfLivingRoom"
//                 placeholder="LivingRoom"
//                 min={0}
//                 className="border-2 block border-light  focus:outline-none"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="" className="font-bold block">
//               Description:
//             </label>
//             <textarea
//               name="description"
//               id=""
//               placeholder="Description"
//               onChange={(e) => setDescription(e.target.value)}
//               rows={8}
//               cols={78}
//               className="focus:outline-none border-2 border-light"
//             ></textarea>
//           </div>
//           <div className="flex gap-5">
//             <div>
//               <label className="font-bold block" htmlFor="">
//                 City:
//               </label>
//               <input
//                 name="city"
//                 type="text"
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="City"
//                 className="border-2 block border-light  lg:w-[15rem] focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="font-bold block" htmlFor="">
//                 TypeOfProperty:
//               </label>
//               <select
//                 name="typeOfProperty"
//                 onChange={(e) => setTypeOfProperty(e.target.value)}
//                 className="focus:outline-none border-2 border-light lg:w-[15rem] "
//               >
//                 <option value="rent">Rent</option>
//                 <option value="sell">Sell</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex gap-5">
//             <div>
//               <label className="font-bold block" htmlFor="">
//                 PropertyArea:
//               </label>
//               <input
//                 type="number"
//                 min={1}
//                 name="propertyArea"
//                 onChange={(e) => setPropertyArea(e.target.value)}
//                 placeholder="propertyArea"
//                 className="border-2 block border-light  lg:w-[15rem] focus:outline-none"
//               />
//             </div>
//             <div className="">
//               <label className="font-bold block" htmlFor="">
//                 Price:
//               </label>
//               <input
//                 type="number"
//                 placeholder="Price"
//                 name="price"
//                 onChange={(e) => setPrice(e.target.value)}
//                 min={0}
//                 className="border-2 block border-light lg:w-[15rem] focus:outline-none"
//               />
//             </div>
//           </div>
//           <div className="flex gap-5">
//             <div>
//               <label className="font-bold block" htmlFor="">
//                 latitude:
//               </label>
//               <input
//                 type="text"
//                 name="latitude"
//                 onChange={(e) => setLatitude(e.target.value)}
//                 placeholder="latitude"
//                 className="border-2 block border-light  lg:w-[15rem] focus:outline-none"
//               />
//             </div>
//             <div className="">
//               <label className="font-bold block" htmlFor="">
//                 Longitude:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Longitude"
//                 name="price"
//                 onChange={(e) => setLongitude(e.target.value)}
//                 className="border-2 block border-light lg:w-[15rem] focus:outline-none"
//               />
//             </div>
//           </div>
//           <div className="my-5 flex">
//             <div className="">
//               <label htmlFor="" className="block font-bold">
//                 Upload Images Of Property
//               </label>
//               <input
//                 type="file"
//                 placeholder=""
//                 multiple
//                 onChange={handleImagesChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="" className="block font-bold">
//                 Upload Thumbnail
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setThumbnail(e.target.files[0])}
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-primary px-6  font-medium text-xl py-1 text-pure"
//           >
//             Update Property
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UpdateProperty;
