import React from "react";
import Hero from "../components/home/Hero";

import AboutUs from "../components/home/AboutUs";

const Home = () => {
  const { data } = useGetChatsQuery();
  console.log(data);
  return (
    <>
      <Hero />
      <AboutUs />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
