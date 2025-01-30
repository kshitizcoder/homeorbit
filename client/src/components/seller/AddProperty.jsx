import React, { useState } from "react";
import { useAddPropertyMutation } from "../../redux/property/propertyApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [addProperty, { isError, isLoading, isSuccess, error }] =
    useAddPropertyMutation();

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

  const naviagte = useNavigate();

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 6) {
      setImages(files);
    } else {
      toast.error("Property must have less than 7 images.");
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

    if (isError) {
      toast.error(error?.data?.message);
    }

    formData.append("title", title);
    formData.append("city", city);
    formData.append("NumberOfBedRoom", NumberOfBedRoom);
    formData.append("NumberOfBathroom", NumberOfBathroom);
    formData.append("NumberOfLivingRoom", NumberOfLivingRoom);
    formData.append("description", description);
    formData.append("typeOfProperty", typeOfProperty);
    formData.append("price", price);
    formData.append("propertyArea", propertyArea);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    await addProperty(formData).unwrap();
  };

  if (isSuccess) {
    naviagte("/seller-dashboard");
  }

  return (
    <section className="py-5">
      <div className="w-full md:w-[80%] mx-auto px-4">
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <h2 className="text-center bg-primary w-[50%] mx-auto py-2 rounded-sm text-pure px-5 text-lg">
            Add Property
          </h2>
          <div>
            <label htmlFor="title" className="font-bold">
              Title:
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 block border-light w-full md:w-[30rem] lg:w-[37rem] focus:outline-none py-2 px-4"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5 my-3">
            <div>
              <label htmlFor="NumberOfBathroom" className="font-bold">
                Number of Bathrooms:
              </label>
              <input
                id="NumberOfBathroom"
                type="number"
                onChange={(e) => setNumberOfBathroom(e.target.value)}
                placeholder="Bathrooms"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="NumberOfBedRoom" className="font-bold">
                Number of Bedrooms:
              </label>
              <input
                id="NumberOfBedRoom"
                type="number"
                onChange={(e) => setNumberOfBedRoom(e.target.value)}
                placeholder="Bedrooms"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="NumberOfLivingRoom" className="font-bold">
                Number of Living Rooms:
              </label>
              <input
                id="NumberOfLivingRoom"
                type="number"
                onChange={(e) => setNumberOfLivingRoom(e.target.value)}
                placeholder="Living Rooms"
                min={0}
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="font-bold">
              Description:
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="border-2 block border-light w-full focus:outline-none py-2 px-4"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="city" className="font-bold">
                City:
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="typeOfProperty" className="font-bold">
                Type of Property:
              </label>
              <select
                id="typeOfProperty"
                value={typeOfProperty}
                onChange={(e) => setTypeOfProperty(e.target.value)}
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="propertyArea" className="font-bold">
                Property Area (in sq ft):
              </label>
              <input
                id="propertyArea"
                type="number"
                onChange={(e) => setPropertyArea(e.target.value)}
                placeholder="Property Area"
                min={1}
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="price" className="font-bold">
                Price:
              </label>
              <input
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="latitude" className="font-bold">
                Latitude:
              </label>
              <input
                id="latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="font-bold">
                Longitude:
              </label>
              <input
                id="longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
          </div>

          <div className="my-5 grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="images" className="block font-bold">
                Upload Property Images:
              </label>
              <input
                id="images"
                type="file"
                multiple
                onChange={handleImagesChange}
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className="block font-bold">
                Upload Thumbnail:
              </label>
              <input
                id="thumbnail"
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="border-2 block border-light w-full focus:outline-none py-2 px-4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary px-6 py-2 text-xl text-pure font-medium w-full md:w-auto"
          >
            Add Property
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProperty;

// import React, { useState } from "react";
// import { useAddPropertyMutation } from "../../redux/property/propertyApi";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AddProperty = () => {
//   const [addProperty, { isError, isLoading, isSuccess, error }] =
//     useAddPropertyMutation();

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

//     formData.append("title", title);
//     formData.append("city", city);
//     formData.append("NumberOfBedRoom", NumberOfBedRoom);
//     formData.append("NumberOfBathroom", NumberOfBathroom);
//     formData.append("NumberOfLivingRoom", NumberOfLivingRoom);
//     formData.append("description", description);
//     formData.append("typeOfProperty", typeOfProperty);
//     formData.append("price", price);
//     formData.append("propertyArea", propertyArea);
//     formData.append("latitude", latitude);
//     formData.append("longitude", longitude);
//     await addProperty(formData).unwrap();
//   };
//   if (isSuccess) {
//     naviagte("/seller-dashboard");
//   }

//   return (
//     <section className="py-5">
//       <div className="w-[80%] mx-auto">
//         <form
//           method="POST"
//           enctype="multipart/form-data"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-center bg-primary w-[50%] mx-auto py-2 rounded-sm text-pure px-5 ">
//             Add Property
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
//             Add Property
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default AddProperty;
