import React from "react";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer class="bg-secondary mt-10 text-pure py-12 rounded-t-lg shadow-lg">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap justify-between space-y-6 md:space-y-0">
          <div class="w-full md:w-1/3 mb-6">
            <h2 class="text-2xl font-semibold text-primary mb-4">HomeOrbit</h2>
            <p class="text-pure leading-relaxed lg:w-[80%]">
              At HomeOrbit, we are dedicated to helping you find your dream
              home. With years of experience and a commitment to exceptional
              service, we make buying, selling, or renting properties
              stress-free and enjoyable.
            </p>
          </div>

          <div class="w-full md:w-1/3 mb-6">
            <h2 class="text-2xl font-semibold text-primary mb-4">
              Quick Links
            </h2>
            <ul class="space-y-4">
              <li>
                <a href="#" class="hover:text-primary flex items-center gap-3">
                  <GoDotFill className="text-xl text-primary" />{" "}
                  <NavLink to={"/"}>Home</NavLink>
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-primary flex items-center gap-3">
                  <GoDotFill className="text-xl text-primary" />{" "}
                  <NavLink to="/property-listing/sell">Sell</NavLink>
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-primary flex items-center gap-3">
                  <GoDotFill className="text-xl text-primary" />{" "}
                  <NavLink to="/property-listing/rent">Rent</NavLink>
                </a>
              </li>
            </ul>
          </div>

          <div class="w-full md:w-1/3 mb-6">
            <h2 class="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
            <p class="text-pure mb-2">Butwal, Lumbini, 32900</p>
            <p class="text-pure mb-2">
              Email: <span class="text-accent">info@homeorbit.com</span>
            </p>
            <p class="text-pure">
              Phone: <span class="text-accent">9869671028</span>
            </p>
          </div>
        </div>
        <div class="border-t border-ternary mt-8 pt-4 text-center">
          <p class="text-pure text-sm">
            © 2025 Home Orbit All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    // <footer class="bg-secondary  text-pure py-8">
    //   <div class="container mx-auto px-4">
    //     <div class="flex flex-wrap justify-between">
    //       <div class="w-full md:w-1/3 mb-6">
    //         <h2 class="text-xl font-semibold">HomeOrbit</h2>
    //         <p class="mt-2 lg:w-[80%]">
    //           At HomeOrbit, we are dedicated to helping you find your dream
    //           home. With years of experience and a commitment to exceptional
    //           service, we make buying, selling, or renting properties
    //           stress-free and enjoyable.
    //         </p>
    //       </div>

    //       <div class="w-full md:w-1/3 mb-6">
    //         <h2 class="text-xl font-semibold">Quick Links</h2>
    //         <ul class="mt-2">
    //           <li>
    //             <a href="#" class="hover:underline flex items-center gap-3">
    //               <GoDotFill className="text-xl text-primary" /> Home
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               class="hover:underline flex items-center gap-3 my-4"
    //             >
    //               <GoDotFill className="text-xl text-primary" /> Sell
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" class="hover:underline flex items-center gap-3">
    //               <GoDotFill className="text-xl text-primary" /> Rent
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div class="w-full md:w-1/3 mb-6">
    //         <h2 class="text-xl font-semibold">Contact Us</h2>
    //         <p class="mt-2">Butwal, Lumbini, 32900</p>
    //         <p class=" my-4">Email: info@homeorbit.com</p>
    //         <p class="mt-2">Phone: 9869671028</p>
    //       </div>
    //     </div>
    //     <div class="border-t border-gray-700 mt-6 pt-4 text-center">
    //       <p>&copy; 2025 Home Orbit All rights reserved.</p>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;
