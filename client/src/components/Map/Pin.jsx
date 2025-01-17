import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link, NavLink } from "react-router-dom";
const Pin = ({ item }) => {
  if (!item.latitude || !item.longitude) return null;

  return (
    // <Marker position={[item?.latitude, item?.longitude]}>
    //   <Popup>
    //     <div className="popupContainer">
    //       <img src={item.images[0]} alt="" />
    //       <div className="textContainer">
    //         <Link to={`//details/111`}>{item.title}</Link>
    //         <span>{item.bedroom} bedroom</span>
    //         <b>$ {item.price}</b>
    //       </div>
    //     </div>
    //   </Popup>
    // </Marker>
    <>
      <Marker position={[item.latitude, item.longitude]}>
        <Popup>
          <div className="w-[14vw]">
            <div className="flex gap-2">
              <img
                className="w-[5rem]"
                src={`http://localhost:4500/thumbnail/${item?.thumbnail}`}
                alt=""
              />

              <div className="textContainer w-">
                <NavLink
                  className="decotation-none text-secondary"
                  to={`/details/${item._id}`}
                >
                  {item?.title}
                </NavLink>

                <p>Price: {item.price}</p>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default Pin;
