import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
const PinDeatils = ({ lon, lat }) => {
  if (!lat || !lon) return null;
  return (
    <>
      <Marker position={[lat, lon]}>
        <Popup></Popup>
      </Marker>
    </>
  );
};

export default PinDeatils;
