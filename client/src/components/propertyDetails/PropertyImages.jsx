import React from "react";

const PropertyImages = ({ images }) => {
  console.log(images);
  return (
    <section className="grid grid-cols-2 gap-2  mt-5">
      {images?.map((img) => {
        return (
          <div key={img}>
            <img
              className=""
              src={
                img
                  ? `https://homeorbit-backend.onrender.com/propertyImg/${img}`
                  : ""
              }
              alt="property-imgage"
            />
          </div>
        );
      })}
    </section>
  );
};

export default PropertyImages;
