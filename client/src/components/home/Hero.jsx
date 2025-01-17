import React, { useState } from "react";
import homeimage from "../../assets/home.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const backgroundImg = {
  background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${homeimage})`,
  width: "100%",
  height: "90vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
};
const Hero = () => {
  const [city, setCity] = useState(" ");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState("rent");
  const navigate = useNavigate();
  // console.log(city, maxPrice, maxPrice, type);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city != " " && minPrice && maxPrice && type != " ") {
      if (type === "rent") {
        navigate("/property-listing/rent", {
          state: { city, minPrice, maxPrice, type },
        });
      } else if (type === "sell") {
        navigate("/property-listing/sell", {
          state: { city, minPrice, maxPrice, type },
        });
      }
    } else {
      toast.error("Fields  Cannot Be Empty");
    }
  };

  return (
    <section className=" px-5" style={backgroundImg}>
      <div className=" px-6 flex justify-center items-center h-[80vh]">
        <div className=" text-center mt-10">
          <h2 className="text-2xl lg:text-6xl font-bold text-pure ">
            Buy, rent, or sell your property easily
          </h2>
          <p className="text-lightwhite text-lg xl:text-xl drop-shadow-md py-5 text-pure">
            A great platform to buy, sell, or even rent your properties without
            any commissions.
          </p>
          <div className="flex  flex-col px-5   py-5 rounded-md w-full  mx-auto">
            <form
              onSubmit={handleSubmit}
              action=""
              className="  bg-pure  py-5 px-5 md:px-10 rounded-md lg:items-center flex flex-col lg:flex-row justify-center"
            >
              <input
                type="text"
                placeholder="Enter the City"
                className="focus:outline-none placeholder:text-ternary"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="number"
                placeholder="Min price"
                min={1}
                className="focus:outline-none lg:mx-4 my-3 placeholder:text-ternary"
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max price"
                min={1}
                className="focus:outline-none lg:mx-4 placeholder:text-ternary"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <select
                name=""
                id=""
                className="lg:px-5 my-3  focus:outline-none text-ternary mr-5"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
              <div>
                <button className="bg-primary text-pure py-2 px-8 rounded-md text-sm font-semibold">
                  Browse Properties
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
