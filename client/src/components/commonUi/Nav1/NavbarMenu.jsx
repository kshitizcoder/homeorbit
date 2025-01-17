import React, { useState } from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const NavbarMenu = () => {
  return (
    <nav className="my-10">
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
    </nav>
  );
};

export default NavbarMenu;
