import React, { useEffect, useState } from "react";

const SearchBox = ({
  city,
  minPrice,
  maxPrice,
  type,
  urlType,
  setCity,
  setType,
  setMinPrice,
  setMaxPrice,
}) => {
  const [cityName, setCityName] = useState(city);
  const [totalMinPrice, setTotalMinPrice] = useState(minPrice);
  const [totalMaxPrice, setTotalMaxprice] = useState(maxPrice);
  const [typeName, setTypeName] = useState(type);
  useEffect(() => {
    if (urlType === "sell") {
      setTypeName("sell");
    } else {
      setTypeName("rent");
    }
  }, [urlType]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityName);
    setMaxPrice(totalMaxPrice);
    setMinPrice(totalMinPrice);
    setType(typeName);
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        action=""
        className="  bg-pure  py-5 px-5 md:px-10 rounded-md lg:items-center flex flex-col lg:flex-row justify-center"
      >
        <div>
          <label htmlFor="" className="font-bold text-secondary">
            City:
          </label>
          <input
            type="text"
            placeholder="Enter the City"
            className="focus:outline-none block placeholder:text-ternary"
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="font-bold text-secondary">
            Min Price:
          </label>
          <input
            type="number"
            placeholder="Min price"
            min={1}
            className="focus:outline-none lg:mx-4 block my-3 lg:my-0 placeholder:text-ternary"
            onChange={(e) => setTotalMinPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="font-bold text-secondary">
            Max Price:
          </label>
          <input
            type="number"
            placeholder="Max price"
            min={1}
            className="focus:outline-none block lg:mx-4 placeholder:text-ternary"
            onChange={(e) => setTotalMaxprice(e.target.value)}
          />
        </div>
        {urlType === "rent" ? (
          <div>
            <label htmlFor="" className="font-bold text-secondary">
              type:
            </label>
            <select
              name=""
              id=""
              className="lg:px-5 my-3 lg:my-0 block focus:outline-none text-ternary mr-5"
              onChange={(e) => setTypeName(e.target.value)}
            >
              <option value="rent" selected>
                rent
              </option>
              <option value="sell">sell</option>
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="" className="font-bold text-secondary">
              type:
            </label>
            <select
              name=""
              id=""
              className="lg:px-5 my-3 lg:my-0 block focus:outline-none text-ternary mr-5"
              onChange={(e) => setTypeName(e.target.value)}
            >
              <option value="rent"> sell</option>
              <option value="sell">rent</option>
            </select>
          </div>
        )}
        <div>
          <button className="bg-primary text-pure py-2 px-8 rounded-md text-sm font-semibold">
            Browse Properties
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-center font-bold">Search Result For:</h2>
        <div className="flex justify-center gap-5">
          <p className="font-medium capitalize">
            {" "}
            City : <span className="text-primary">{cityName}</span>
          </p>
          <p className="font-medium capitalize">
            {" "}
            Min Price : <span className="text-primary">{minPrice}</span>
          </p>
          <p className="font-medium capitalize">
            {" "}
            Max Price : <span className="text-primary">{maxPrice}</span>
          </p>
          <p className="font-medium capitalize">
            {" "}
            Type Of Property : <span className="text-primary">{typeName}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchBox;
