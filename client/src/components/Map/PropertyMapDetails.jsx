import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";
import PinDeatils from "./PinDetails";
const PropertyMapDetails = ({ items }) => {
  console.log(items);
  const position =
    items?.property?.latitude && items?.property?.longitude
      ? [items?.property?.latitude, items?.property?.longitude]
      : [0, 0];
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-[100%] h-[100vh]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <PinDeatils
        lat={items?.property?.latitude}
        lon={items?.property?.longitude}
      />
    </MapContainer>
  );
};

export default PropertyMapDetails;
