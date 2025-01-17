import React from "react";

const DesktopNav = () => {
  return (
    <div className="flex px-10 py-3 items-center justify-between">
      <div>
        <h1 className="text-2xl">Logo..</h1>
      </div>
      <div className="flex gap-5 items-center">
        <ul className="flex gap-5 font-medium mr-10">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <button className="font-medium">login</button>
        <button className="bg-blue-600 px-7 rounded text-white py-1">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
