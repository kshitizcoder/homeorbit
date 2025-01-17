import React from "react";
import Hero from "../components/home/Hero";
import { useGetChatsQuery } from "../redux/chat/chatApi";
import AboutUs from "../components/home/AboutUs";
import Footer from "../components/home/Footer";

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
