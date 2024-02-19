import React from "react";
import Logo from "./Logo";
import Menubar from "../navigation/Menubar";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between container mx-auto mb-5 px-10">
        <Logo />
        <Menubar />
      </header>
    </>
  );
};

export default Header;
