import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

const PropertyMap = ({ items }) => {
  // If items or items.property are undefined or empty, use default coordinates
  const defaultPosition = [27.707939, 83.45697];

  // Set the map center based on the first property's latitude and longitude
  const mapCenter =
    items?.property?.length > 0 &&
    items?.property[0]?.latitude &&
    items?.property[0]?.longitude
      ? [items.property[0].latitude, items.property[0].longitude]
      : defaultPosition;

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={false}
      className="w-[100%] h-[90vh]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Map over properties and display pins */}
      {items?.property?.map((item) => (
        <Pin item={item} key={item._id} />
      ))}
    </MapContainer>
  );
};

export default PropertyMap;

// import React from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import Pin from "./Pin";
// const PropertyMap = ({ items }) => {
//
//   return (
//     <MapContainer
//       center={
//         items?.property?.length > 1
//           ? [items?.property?.latitude, items?.property?.longitude]
//           : [27.707939, 83.45697]
//       }
//       zoom={13}
//       scrollWheelZoom={false}
//       className="w-[100%] h-[90vh] "
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {items?.property?.map((item) => (
//         <Pin item={item} key={item._id} />
//       ))}
//     </MapContainer>
//   );
// };

// export default PropertyMap;
