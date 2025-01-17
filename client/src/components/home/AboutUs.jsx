import React from "react";
import AboutImg from "../../assets/abouthouse.jpg";
import { NavLink } from "react-router-dom";
const AboutUs = () => {
  return (
    <>
      <section>
        <div class="flex my-8 flex-col md:flex-row items-center md:items-start md:space-x-12 bg-gray-100 p-10 rounded-lg shadow-lg">
          <div class="w-full md:w-1/2">
            <img
              src={AboutImg}
              alt="Real Estate"
              class="rounded-xl shadow-xl w-full object-cover h-64 md:h-full"
            />
          </div>

          <div class="w-full md:w-1/2 mt-8 md:mt-0">
            <h2 class="text-4xl font-extrabold text-secondary mb-6">
              About Us
            </h2>
            <p class="text-ternary text-lg leading-relaxed mb-6">
              Welcome to{" "}
              <span class="text-primary font-semibold">Home Orbit</span>, your
              trusted partner in real estate. With years of expertise, we
              specialize in connecting clients with their dream properties, from
              cozy homes to luxurious estates. Our team is dedicated to
              providing personalized service, ensuring every transaction is
              smooth and stress-free. We pride ourselves on integrity,
              transparency, and a deep understanding of the real estate market.
              At Home Orbit, your vision is our mission. Let us guide you to the
              perfect place to call home.
            </p>
            <p class="text-ternary text-lg leading-relaxed mb-6">
              Whether you're buying, selling, or investing, our experienced team
              is here to guide you every step of the way. With in-depth
              knowledge of the real estate market, we provide exceptional
              service tailored to your unique needs. From finding the perfect
              property to securing the best deals, we work tirelessly to make
              the process seamless and stress-free. Trust us to turn your real
              estate dreams into reality.
            </p>
            <button class="bg-primary text-pure px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-300 ease-in-out">
              <NavLink to={"/rent"} class="text-lg font-semibold">
                Get Started
              </NavLink>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
